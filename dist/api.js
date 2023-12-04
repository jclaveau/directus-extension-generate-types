import * as fs from 'node:fs';

function defineHook(config) {
    return config;
}

async function generateTsTypes(collections, useIntersectionTypes = false) {
  let ret = "";
  const types = [];
  if (collections instanceof Promise) {
    collections = await collections;
  }
  Object.values(collections).forEach((collection) => {
    const collectionName = collection.collection;
    const typeName = pascalCase(collectionName);
    types.push(`${collectionName}: ${typeName}`);
    ret += `export type ${typeName} = {
`;
    collection.fields.forEach((field) => {
      if (field.meta?.interface?.startsWith("presentation-"))
        return;
      ret += "  ";
      ret += field.field.includes("-") ? `"${field.field}"` : field.field;
      if (field.schema?.is_nullable) {
        ret += "?";
      }
      ret += ": ";
      ret += getType(field, useIntersectionTypes);
      ret += ";\n";
    });
    ret += "};\n\n";
  });
  ret += "export type GeneratedDirectusTypes = {\n" + types.map((x) => `  ${x};`).join("\n") + "\n};";
  ret += "\n";
  return ret;
}
function pascalCase(str) {
  return str.split(" ").flatMap((x) => x.split("_")).flatMap((y) => y.split("-")).map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join("");
}
function getType(field, useIntersectionTypes = false) {
  let type;
  if (field.meta?.options?.choices) {
    const choices = field.meta.options.choices.map((choice) => {
      if (typeof choice === "string") {
        return choice;
      } else if (typeof choice === "object" && choice !== null) {
        return choice.value;
      } else {
        throw new Error("Unhandled choices structure: " + JSON.stringify(field, null, 2));
      }
    });
    type = [...new Set(choices)].map((choice) => {
      if (choice === null) {
        return "null";
      } else {
        return '"' + choice.replaceAll("\\", "\\\\") + '"';
      }
    }).join(" | ");
  } else if (["integer", "bigInteger", "float", "decimal"].includes(field.type)) {
    type = "number";
  } else if (["boolean"].includes(field.type)) {
    type = "boolean";
  } else if (["json", "csv"].includes(field.type)) {
    type = "unknown";
  } else {
    type = "string";
  }
  if (field.relation) {
    const foreignKeyType = "string | number";
    const itemType = field.relation.collection ? pascalCase(field.relation.collection) : "any";
    if (field.relation.type === "many") {
      type = `(${foreignKeyType})[] ${useIntersectionTypes ? "&" : "|"} (${itemType})[]`;
    } else {
      type = `${foreignKeyType} ${useIntersectionTypes ? "&" : "|"} ${itemType}`;
    }
  }
  return type;
}

function warn(str) {
  console.warn(
    `%c[directus-extension-generate-types]%c
${str}`,
    "font-weight: bold;"
  );
}

async function gatherCollectionsData(rawCollections, rawFields, rawRelations) {
  const collections = {};
  rawCollections.sort((a, b) => a.collection.localeCompare(b.collection)).forEach(
    (collection) => collections[collection.collection] = { ...collection, fields: [] }
  );
  rawFields.sort((a, b) => a.field.localeCompare(b.field)).forEach((field) => {
    if (!collections[field.collection]) {
      warn(`${field.collection} not found`);
      return;
    }
    collections[field.collection].fields.push(field);
  });
  Object.keys(collections).forEach((key) => {
    if (collections[key].fields.length === 0)
      delete collections[key];
  });
  rawRelations.forEach((relation) => {
    const oneField = collections[relation.meta.one_collection]?.fields.find(
      (field) => field.field === relation.meta.one_field
    );
    const manyField = collections[relation.meta.many_collection]?.fields.find(
      (field) => field.field === relation.meta.many_field
    );
    if (oneField)
      oneField.relation = {
        type: "many",
        collection: relation.meta.many_collection
      };
    if (manyField)
      manyField.relation = {
        type: "one",
        collection: relation.meta.one_collection
      };
  });
  return collections;
}

var e0 = defineHook(async ({ action }, extCtx) => {
  const { services: { CollectionsService, FieldsService, RelationsService }, env, logger, getSchema } = extCtx;
  let targetFiles = env.GENERATE_TYPES_SYNCED_TS_FILES;
  if (targetFiles == null || targetFiles.length === 0) {
    logger.info("No target file defined to automatically sync TypeScript types");
    return;
  }
  if (!Array.isArray(targetFiles)) {
    targetFiles = [targetFiles];
  }
  const saveTypescriptTypesToFile = async () => {
    const schema = await getSchema();
    const collectionsService = new CollectionsService({ schema });
    const collections = await collectionsService.readByQuery();
    const fieldsService = new FieldsService({ schema });
    const fields = await fieldsService.readAll();
    const relationsService = new RelationsService({ schema });
    const relations = await relationsService.readAll();
    const collectionsData = await gatherCollectionsData(
      collections,
      fields,
      relations
    );
    let useIntersectionTypes = false;
    generateTsTypes(collectionsData, useIntersectionTypes).then((types) => {
      targetFiles.forEach((targetFile) => {
        writeToFile("./", targetFile, disclaimerHeader + types);
        logger.info(`Types synced into ${targetFile}`);
      });
    });
  };
  const onChange = async () => {
    saveTypescriptTypesToFile();
  };
  action("collections.create", onChange);
  action("collections.update", onChange);
  action("collections.delete", onChange);
  action("fields.create", onChange);
  action("fields.update", onChange);
  action("fields.delete", onChange);
  action("relations.create", onChange);
  action("relations.update", onChange);
  action("relations.delete", onChange);
});
const writeToFile = (directoryPath, fileName, data) => {
  try {
    fs.mkdirSync(directoryPath, { recursive: true });
  } catch (e) {
    if (e.code != `EEXIST`) {
      throw e;
    }
  }
  fs.writeFileSync(`${directoryPath}/${fileName}`, data);
};
const disclaimerHeader = `/*
 * This file is generated by 'directus-extensions-generate-types' script.
 * Do not edit manually.
 */
`;

const hooks = [{name:'extension-hook.sync-ts-files',config:e0}];const endpoints = [];const operations = [];

export { endpoints, hooks, operations };
