import { Collections, Field } from '../types';

export default async function generateTsTypes(
  collections: Collections | Promise<Collections>,
  useIntersectionTypes = false
) {
  let ret = "";
  const types = [];

  if (collections instanceof Promise) {
    collections = await collections;
  }

  Object.values(collections).forEach((collection) => {
    const collectionName = collection.collection;
    const typeName = pascalCase(collectionName);
    types.push(`${collectionName}: ${typeName}`);
    ret += `export type ${typeName} = {\n`;
    collection.fields.forEach((field) => {
      if (field.meta?.interface?.startsWith("presentation-")) return;
      ret += "  ";
      ret += field.field.includes("-") ? `"${field.field}"` : field.field;
      if (field.schema?.is_nullable) { // ! field.meta?.required ?
        ret += "?"
      };
      ret += ": ";
      ret += getType(field, useIntersectionTypes);
      ret += ";\n";
    });
    ret += "};\n\n";
  });

  ret +=
    "export type GeneratedDirectusTypes = {\n" +
    types.map((x) => `  ${x};`).join("\n") +
    "\n};";

  ret += "\n";

  return ret;
}

function pascalCase(str: string) {
  return str
    .split(" ")
    .flatMap((x) => x.split("_"))
    .flatMap((y) => y.split("-"))
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join("");
}

function getType(field: Field, useIntersectionTypes = false) {
  let type: string;

  // console.log('getType', field);

  if (field.meta?.options?.choices) {
    const choices: string[] = field.meta.options.choices.map((choice: {value: string | null} | string) => {
      if (typeof choice === 'string') {
        return choice
      }
      else if (typeof choice === 'object' && choice !== null) {
        return choice.value
      }
      else {
        throw new Error('Unhandled choices structure: ' +  JSON.stringify(field, null, 2))
      }
    });
    type = [...new Set(choices)]
      .map((choice: string | null) => {
        if (choice === null) {
          return 'null'
        } else {
          return '"' + choice.replaceAll('\\', '\\\\') + '"'
        }
      }).join(" | ");
  }
  else if (["integer", "bigInteger", "float", "decimal"].includes(field.type)) {
    type = "number";
  } else if (["boolean"].includes(field.type)) {
    type = "boolean";
  } else if (["json", "csv"].includes(field.type)) {
    type = "unknown";
  } else {
    type = "string";
  }

  if (field.relation) {
    const foreignKeyType = 'string | number' // DefaultItem forces string | number as type for foreignkeys instead of the true type of the id

    const itemType = field.relation.collection
      ? pascalCase(field.relation.collection)
      : "any"

    if (field.relation.type === "many") {
      type = `(${foreignKeyType})[] ${useIntersectionTypes ? "&" : "|"} (${itemType})[]`;
    }
    else {
      type = `${foreignKeyType} ${useIntersectionTypes ? "&" : "|"} ${itemType}`;
    }
  }

  return type;
}
