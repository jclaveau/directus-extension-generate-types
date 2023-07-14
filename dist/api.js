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
      var _a, _b, _c;
      if ((_b = (_a = field.meta) == null ? void 0 : _a.interface) == null ? void 0 : _b.startsWith("presentation-"))
        return;
      ret += "  ";
      ret += field.field.includes("-") ? `"${field.field}"` : field.field;
      if ((_c = field.schema) == null ? void 0 : _c.is_nullable) {
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
  if (["integer", "bigInteger", "float", "decimal"].includes(field.type)) {
    type = "number";
  } else if (["boolean"].includes(field.type)) {
    type = "boolean";
  } else if (["json", "csv"].includes(field.type)) {
    type = "unknown";
  } else {
    type = "string";
  }
  if (field.relation) {
    type += useIntersectionTypes ? " & " : " | ";
    type += field.relation.collection ? pascalCase(field.relation.collection) : "any";
    if (field.relation.type === "many") {
      type = `(${type})[]`;
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
    var _a, _b;
    const oneField = (_a = collections[relation.meta.one_collection]) == null ? void 0 : _a.fields.find(
      (field) => field.field === relation.meta.one_field
    );
    const manyField = (_b = collections[relation.meta.many_collection]) == null ? void 0 : _b.fields.find(
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
  saveTypescriptTypesToFile();
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
