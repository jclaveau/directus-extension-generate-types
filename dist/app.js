import { resolveComponent, openBlock, createBlock, withCtx, createVNode, createElementBlock, Fragment, renderList, createElementVNode, createTextVNode, toDisplayString, pushScopeId, popScopeId, computed, createCommentVNode } from 'vue';
import { useStores } from '@directus/extensions-sdk';
import { useI18n } from 'vue-i18n';

const languages = {
  ts: {
    name: "TypeScript",
    icon: `<svg style="width: 1em; height: 1em" viewBox="0 0 128 128" fill="rgb(23, 41, 64)"><path d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"></path></svg>`,
    logo: `<svg style="width: 2em; height: 2em" viewBox="0 0 128 128"><path fill="#007acc" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"></path></svg>`
  },
  py: {
    name: "Python",
    icon: `<svg style="width: 1em; height: 1em" fill="rgb(23, 41, 64)" viewBox="0 0 128 128"><path d="M49.33 62h29.159C86.606 62 93 55.132 93 46.981V19.183c0-7.912-6.632-13.856-14.555-15.176-5.014-.835-10.195-1.215-15.187-1.191-4.99.023-9.612.448-13.805 1.191C37.098 6.188 35 10.758 35 19.183V30h29v4H23.776c-8.484 0-15.914 5.108-18.237 14.811-2.681 11.12-2.8 17.919 0 29.53C7.614 86.983 12.569 93 21.054 93H31V79.952C31 70.315 39.428 62 49.33 62zm-1.838-39.11c-3.026 0-5.478-2.479-5.478-5.545 0-3.079 2.451-5.581 5.478-5.581 3.015 0 5.479 2.502 5.479 5.581-.001 3.066-2.465 5.545-5.479 5.545zm74.789 25.921C120.183 40.363 116.178 34 107.682 34H97v12.981C97 57.031 88.206 65 78.489 65H49.33C41.342 65 35 72.326 35 80.326v27.8c0 7.91 6.745 12.564 14.462 14.834 9.242 2.717 17.994 3.208 29.051 0C85.862 120.831 93 116.549 93 108.126V97H64v-4h43.682c8.484 0 11.647-5.776 14.599-14.66 3.047-9.145 2.916-17.799 0-29.529zm-41.955 55.606c3.027 0 5.479 2.479 5.479 5.547 0 3.076-2.451 5.579-5.479 5.579-3.015 0-5.478-2.502-5.478-5.579 0-3.068 2.463-5.547 5.478-5.547z"></path></svg>`,
    logo: `<svg style="width: 2em; height: 2em" viewBox="0 0 128 128"><linearGradient id="python-original-a" gradientUnits="userSpaceOnUse" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"></stop><stop offset="1" stop-color="#306998"></stop></linearGradient><linearGradient id="python-original-b" gradientUnits="userSpaceOnUse" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"></stop><stop offset="1" stop-color="#FFE873"></stop></linearGradient><path fill="url(#python-original-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" transform="translate(0 10.26)"></path><path fill="url(#python-original-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" transform="translate(0 10.26)"></path><radialGradient id="python-original-c" cx="1825.678" cy="444.45" r="26.743" gradientTransform="matrix(0 -.24 -1.055 0 532.979 557.576)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8B8B8" stop-opacity=".498"></stop><stop offset="1" stop-color="#7F7F7F" stop-opacity="0"></stop></radialGradient><path opacity=".444" fill="url(#python-original-c)" d="M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416-18.276 0-33.092-2.873-33.092-6.416 0-3.544 14.815-6.417 33.092-6.417 18.275 0 33.091 2.872 33.091 6.417z"></path></svg>`
  },
  oas: {
    name: "OpenAPI",
    icon: `<svg style="width: 1em; height: 1em" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="rgb(23, 41, 64)"><path d="M50.2,4.7c24.9,0,45.1,20.2,45.1,45.1c0,24.9-20.2,45.1-45.1,45.1c-24.9,0-45.1-20.2-45.1-45.1        C5.1,24.9,25.3,4.7,50.2,4.7 M50.2,0C22.7,0,0.3,22.4,0.3,49.8s22.4,49.8,49.8,49.8S100,77.3,100,49.8S77.6,0,50.2,0L50.2,0z"/><path d="M31.7,33.7c-0.2,1.7,0.1,3.5-0.1,5.2c-0.1,1.7-0.3,3.4-0.7,5.1c-0.5,2.4-2,4.3-4.1,5.8   c4.1,2.6,4.5,6.7,4.8,10.9c0.1,2.2,0.1,4.5,0.3,6.7c0.2,1.7,0.8,2.2,2.6,2.2c0.7,0,1.5,0,2.3,0V75c-5.3,0.9-9.6-0.6-10.7-5.1   c-0.3-1.6-0.6-3.3-0.7-5c-0.1-1.8,0.1-3.6-0.1-5.3c-0.4-4.9-1-6.5-5.7-6.8v-6.1c0.3-0.1,0.7-0.1,1-0.2c2.6-0.1,3.7-0.9,4.2-3.5   c0.3-1.4,0.4-2.9,0.5-4.3c0.2-2.8,0.1-5.6,0.6-8.4c0.7-4,3.1-5.9,7.2-6.1c1.1-0.1,2.3,0,3.6,0v5.4c-0.6,0-1,0.1-1.5,0.1   C32.1,29.8,31.9,31,31.7,33.7z M38.1,46.3L38.1,46.3c-2-0.1-3.6,1.4-3.7,3.3c-0.1,1.9,1.4,3.6,3.3,3.7h0.2c1.9,0.1,3.5-1.3,3.6-3.2   v-0.2C41.6,48,40,46.4,38.1,46.3z M50.1,46.3c-1.9-0.1-3.4,1.4-3.5,3.2c0,0.1,0,0.2,0,0.3c0,2.1,1.4,3.4,3.6,3.4   c2.1,0,3.4-1.4,3.4-3.5C53.6,47.7,52.2,46.3,50.1,46.3z M62.4,46.3c-2,0-3.6,1.5-3.6,3.5c0,2,1.6,3.5,3.5,3.5h0   c1.8,0.3,3.5-1.4,3.7-3.4C66.1,48,64.4,46.3,62.4,46.3z M79.3,46.6c-2.2-0.1-3.3-0.8-3.9-3c-0.3-1.3-0.6-2.7-0.6-4.1   c-0.2-2.6-0.1-5.2-0.3-7.7c-0.4-6.1-4.8-8.2-11.2-7.2v5.3c1,0,1.8,0,2.6,0c1.4,0,2.4,0.5,2.5,2.1c0.1,1.4,0.1,2.8,0.3,4.2   c0.3,2.8,0.4,5.6,0.9,8.3c0.4,2.3,2,3.9,3.9,5.3c-3.4,2.3-4.4,5.5-4.6,9.2c-0.1,2.5-0.2,5-0.3,7.6c-0.1,2.3-0.9,3-3.2,3.1   c-0.7,0-1.3,0.1-2,0.1v5.4c1.4,0,2.6,0.1,3.9,0c3.9-0.2,6.2-2.1,7-5.9c0.3-2.1,0.5-4.2,0.6-6.2c0.1-1.9,0.1-3.9,0.3-5.7   c0.3-3,1.6-4.2,4.6-4.4c0.3,0,0.6-0.1,0.8-0.2v-6.1C80,46.7,79.7,46.6,79.3,46.6z" /></svg>`,
    logo: `<svg style="width: 2em; height: 2em" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path style="fill: #85ea2d" d="M50.2,97.3C24,97.3,2.7,76,2.7,49.8S24,2.4,50.2,2.4s47.5,21.3,47.5,47.5S76.3,97.3,50.2,97.3z" /><path style="fill: #173647" d="M50.2,4.7c24.9,0,45.1,20.2,45.1,45.1c0,24.9-20.2,45.1-45.1,45.1c-24.9,0-45.1-20.2-45.1-45.1        C5.1,24.9,25.3,4.7,50.2,4.7 M50.2,0C22.7,0,0.3,22.4,0.3,49.8s22.4,49.8,49.8,49.8S100,77.3,100,49.8S77.6,0,50.2,0L50.2,0z" /><path style="fill: #173647" d="M31.7,33.7c-0.2,1.7,0.1,3.5-0.1,5.2c-0.1,1.7-0.3,3.4-0.7,5.1c-0.5,2.4-2,4.3-4.1,5.8   c4.1,2.6,4.5,6.7,4.8,10.9c0.1,2.2,0.1,4.5,0.3,6.7c0.2,1.7,0.8,2.2,2.6,2.2c0.7,0,1.5,0,2.3,0V75c-5.3,0.9-9.6-0.6-10.7-5.1   c-0.3-1.6-0.6-3.3-0.7-5c-0.1-1.8,0.1-3.6-0.1-5.3c-0.4-4.9-1-6.5-5.7-6.8v-6.1c0.3-0.1,0.7-0.1,1-0.2c2.6-0.1,3.7-0.9,4.2-3.5   c0.3-1.4,0.4-2.9,0.5-4.3c0.2-2.8,0.1-5.6,0.6-8.4c0.7-4,3.1-5.9,7.2-6.1c1.1-0.1,2.3,0,3.6,0v5.4c-0.6,0-1,0.1-1.5,0.1   C32.1,29.8,31.9,31,31.7,33.7z M38.1,46.3L38.1,46.3c-2-0.1-3.6,1.4-3.7,3.3c-0.1,1.9,1.4,3.6,3.3,3.7h0.2c1.9,0.1,3.5-1.3,3.6-3.2   v-0.2C41.6,48,40,46.4,38.1,46.3z M50.1,46.3c-1.9-0.1-3.4,1.4-3.5,3.2c0,0.1,0,0.2,0,0.3c0,2.1,1.4,3.4,3.6,3.4   c2.1,0,3.4-1.4,3.4-3.5C53.6,47.7,52.2,46.3,50.1,46.3z M62.4,46.3c-2,0-3.6,1.5-3.6,3.5c0,2,1.6,3.5,3.5,3.5h0   c1.8,0.3,3.5-1.4,3.7-3.4C66.1,48,64.4,46.3,62.4,46.3z M79.3,46.6c-2.2-0.1-3.3-0.8-3.9-3c-0.3-1.3-0.6-2.7-0.6-4.1   c-0.2-2.6-0.1-5.2-0.3-7.7c-0.4-6.1-4.8-8.2-11.2-7.2v5.3c1,0,1.8,0,2.6,0c1.4,0,2.4,0.5,2.5,2.1c0.1,1.4,0.1,2.8,0.3,4.2   c0.3,2.8,0.4,5.6,0.9,8.3c0.4,2.3,2,3.9,3.9,5.3c-3.4,2.3-4.4,5.5-4.6,9.2c-0.1,2.5-0.2,5-0.3,7.6c-0.1,2.3-0.9,3-3.2,3.1   c-0.7,0-1.3,0.1-2,0.1v5.4c1.4,0,2.6,0.1,3.9,0c3.9-0.2,6.2-2.1,7-5.9c0.3-2.1,0.5-4.2,0.6-6.2c0.1-1.9,0.1-3.9,0.3-5.7   c0.3-3,1.6-4.2,4.6-4.4c0.3,0,0.6-0.1,0.8-0.2v-6.1C80,46.7,79.7,46.6,79.3,46.6z" /></svg>`
  }
};

var version = "0.4.2";

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$7 = "\nsvg[data-v-9cf31bb0] {\n  height: 1em;\n  width: 1em;\n  fill: rgb(23, 41, 64);\n}\n.version .v-icon[data-v-9cf31bb0] {\n  color: var(--foreground-subdued);\n  transition: color var(--fast) var(--transition);\n}\n.version[data-v-9cf31bb0] .v-text-overflow {\n  color: var(--foreground-subdued);\n  transition: color var(--fast) var(--transition);\n}\n.version:hover .v-icon[data-v-9cf31bb0] {\n  color: var(--foreground-normal-alt);\n}\n.version[data-v-9cf31bb0]:hover .v-text-overflow {\n  color: var(--foreground-normal-alt);\n}\n";
n(css$7,{});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main$5 = {
  data: () => ({
    languages,
    version,
  }),
};
const _hoisted_1$5 = ["innerHTML"];

function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_list_item_icon = resolveComponent("v-list-item-icon");
  const _component_v_text_overflow = resolveComponent("v-text-overflow");
  const _component_v_list_item_content = resolveComponent("v-list-item-content");
  const _component_v_list_item = resolveComponent("v-list-item");
  const _component_v_divider = resolveComponent("v-divider");
  const _component_v_list = resolveComponent("v-list");

  return (openBlock(), createBlock(_component_v_list, { nav: "" }, {
    default: withCtx(() => [
      createVNode(_component_v_list_item, {
        to: "/generate-types/index",
        class: "version"
      }, {
        default: withCtx(() => [
          createVNode(_component_v_list_item_icon, null, {
            default: withCtx(() => [
              createVNode(_component_v_icon, { name: "code" })
            ]),
            _: 1 /* STABLE */
          }),
          createVNode(_component_v_list_item_content, null, {
            default: withCtx(() => [
              createVNode(_component_v_text_overflow, {
                class: "version",
                text: `generate-types v${_ctx.version}`
              }, null, 8 /* PROPS */, ["text"])
            ]),
            _: 1 /* STABLE */
          })
        ]),
        _: 1 /* STABLE */
      }),
      createVNode(_component_v_divider),
      (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(_ctx.languages), (language) => {
        return (openBlock(), createBlock(_component_v_list_item, {
          key: language,
          to: `/generate-types/${language}`
        }, {
          default: withCtx(() => [
            createVNode(_component_v_list_item_icon, null, {
              default: withCtx(() => [
                createElementVNode("div", {
                  innerHTML: _ctx.languages[language].icon
                }, null, 8 /* PROPS */, _hoisted_1$5)
              ]),
              _: 2 /* DYNAMIC */
            }, 1024 /* DYNAMIC_SLOTS */),
            createVNode(_component_v_list_item_content, null, {
              default: withCtx(() => [
                createVNode(_component_v_text_overflow, {
                  text: _ctx.languages[language].name
                }, null, 8 /* PROPS */, ["text"])
              ]),
              _: 2 /* DYNAMIC */
            }, 1024 /* DYNAMIC_SLOTS */)
          ]),
          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["to"]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    _: 1 /* STABLE */
  }))
}
var NavbarComponent = /*#__PURE__*/_export_sfc(_sfc_main$5, [['render',_sfc_render$5],['__scopeId',"data-v-9cf31bb0"],['__file',"navigation.vue"]]);

var css$6 = "\n.page[data-v-8858cf84] {\n  padding: 0 var(--content-padding) var(--content-padding-bottom);\n}\ncode[data-v-8858cf84] {\n  background-color: rgba(0, 0, 0, 0.05);\n  font-size: 0.9em;\n  padding: 3px 5px;\n  border-radius: 4px;\n}\nh4[data-v-8858cf84] {\n  font-size: 1.3em;\n  font-weight: 700;\n}\nh4[data-v-8858cf84],\np[data-v-8858cf84] {\n  margin-bottom: 1em;\n}\nsvg[data-v-8858cf84] {\n  width: 1em;\n  height: 1em;\n  margin-right: 5px;\n  transform: translateY(1px);\n}\na[data-v-8858cf84] {\n  color: var(--primary-110);\n  font-weight: 500;\n  text-decoration: none;\n}\na[data-v-8858cf84]:hover {\n  text-decoration: underline;\n}\n";
n(css$6,{});

const _sfc_main$4 = {
  components: { NavbarComponent },
  data() {
    return {
      version,
    };
  },
};

const _withScopeId$2 = n => (pushScopeId("data-v-8858cf84"),n=n(),popScopeId(),n);
const _hoisted_1$4 = { class: "page" };
const _hoisted_2$4 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createElementVNode("code", null, "generate-types", -1 /* HOISTED */));
const _hoisted_3$3 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createElementVNode("p", null, " Select the language you want to generate types for on the left to start. ", -1 /* HOISTED */));
const _hoisted_4$2 = /*#__PURE__*/ _withScopeId$2(() => /*#__PURE__*/createElementVNode("p", null, [
  /*#__PURE__*/createElementVNode("a", { href: "https://github.com/maltejur/directus-extension-generate-types" }, [
    /*#__PURE__*/createElementVNode("svg", { viewBox: "0 0 128 128" }, [
      /*#__PURE__*/createElementVNode("g", { fill: "currentColor" }, [
        /*#__PURE__*/createElementVNode("path", {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: "M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
        }),
        /*#__PURE__*/createElementVNode("path", { d: "M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0" })
      ])
    ]),
    /*#__PURE__*/createElementVNode("span", null, "GitHub")
  ])
], -1 /* HOISTED */));

function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NavbarComponent = resolveComponent("NavbarComponent");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_button = resolveComponent("v-button");
  const _component_private_view = resolveComponent("private-view");

  return (openBlock(), createBlock(_component_private_view, { title: "Generate Types" }, {
    navigation: withCtx(() => [
      createVNode(_component_NavbarComponent)
    ]),
    "title-outer:prepend": withCtx(() => [
      createVNode(_component_v_button, {
        class: "header-icon",
        rounded: "",
        disabled: "",
        icon: "",
        secondary: ""
      }, {
        default: withCtx(() => [
          createVNode(_component_v_icon, { name: "code" })
        ]),
        _: 1 /* STABLE */
      })
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_1$4, [
        createElementVNode("h4", null, [
          createTextVNode(" Welcome to "),
          _hoisted_2$4,
          createTextVNode(" version "),
          createElementVNode("code", null, toDisplayString($data.version), 1 /* TEXT */)
        ]),
        _hoisted_3$3,
        _hoisted_4$2
      ])
    ]),
    _: 1 /* STABLE */
  }))
}
var IndexComponent = /*#__PURE__*/_export_sfc(_sfc_main$4, [['render',_sfc_render$4],['__scopeId',"data-v-8858cf84"],['__file',"index.vue"]]);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var prism = {exports: {}};

(function (module) {
	/* **********************************************
	     Begin prism-core.js
	********************************************** */

	/// <reference lib="WebWorker"/>

	var _self = (typeof window !== 'undefined')
		? window   // if in browser
		: (
			(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
				? self // if in worker
				: {}   // if in node js
		);

	/**
	 * Prism: Lightweight, robust, elegant syntax highlighting
	 *
	 * @license MIT <https://opensource.org/licenses/MIT>
	 * @author Lea Verou <https://lea.verou.me>
	 * @namespace
	 * @public
	 */
	var Prism = (function (_self) {

		// Private helper vars
		var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
		var uniqueId = 0;

		// The grammar object for plaintext
		var plainTextGrammar = {};


		var _ = {
			/**
			 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
			 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
			 * additional languages or plugins yourself.
			 *
			 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
			 *
			 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.manual = true;
			 * // add a new <script> to load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			manual: _self.Prism && _self.Prism.manual,
			/**
			 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
			 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
			 * own worker, you don't want it to do this.
			 *
			 * By setting this value to `true`, Prism will not add its own listeners to the worker.
			 *
			 * You obviously have to change this value before Prism executes. To do this, you can add an
			 * empty Prism object into the global scope before loading the Prism script like this:
			 *
			 * ```js
			 * window.Prism = window.Prism || {};
			 * Prism.disableWorkerMessageHandler = true;
			 * // Load Prism's script
			 * ```
			 *
			 * @default false
			 * @type {boolean}
			 * @memberof Prism
			 * @public
			 */
			disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

			/**
			 * A namespace for utility methods.
			 *
			 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
			 * change or disappear at any time.
			 *
			 * @namespace
			 * @memberof Prism
			 */
			util: {
				encode: function encode(tokens) {
					if (tokens instanceof Token) {
						return new Token(tokens.type, encode(tokens.content), tokens.alias);
					} else if (Array.isArray(tokens)) {
						return tokens.map(encode);
					} else {
						return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
					}
				},

				/**
				 * Returns the name of the type of the given value.
				 *
				 * @param {any} o
				 * @returns {string}
				 * @example
				 * type(null)      === 'Null'
				 * type(undefined) === 'Undefined'
				 * type(123)       === 'Number'
				 * type('foo')     === 'String'
				 * type(true)      === 'Boolean'
				 * type([1, 2])    === 'Array'
				 * type({})        === 'Object'
				 * type(String)    === 'Function'
				 * type(/abc+/)    === 'RegExp'
				 */
				type: function (o) {
					return Object.prototype.toString.call(o).slice(8, -1);
				},

				/**
				 * Returns a unique number for the given object. Later calls will still return the same number.
				 *
				 * @param {Object} obj
				 * @returns {number}
				 */
				objId: function (obj) {
					if (!obj['__id']) {
						Object.defineProperty(obj, '__id', { value: ++uniqueId });
					}
					return obj['__id'];
				},

				/**
				 * Creates a deep clone of the given object.
				 *
				 * The main intended use of this function is to clone language definitions.
				 *
				 * @param {T} o
				 * @param {Record<number, any>} [visited]
				 * @returns {T}
				 * @template T
				 */
				clone: function deepClone(o, visited) {
					visited = visited || {};

					var clone; var id;
					switch (_.util.type(o)) {
						case 'Object':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = /** @type {Record<string, any>} */ ({});
							visited[id] = clone;

							for (var key in o) {
								if (o.hasOwnProperty(key)) {
									clone[key] = deepClone(o[key], visited);
								}
							}

							return /** @type {any} */ (clone);

						case 'Array':
							id = _.util.objId(o);
							if (visited[id]) {
								return visited[id];
							}
							clone = [];
							visited[id] = clone;

							(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
								clone[i] = deepClone(v, visited);
							});

							return /** @type {any} */ (clone);

						default:
							return o;
					}
				},

				/**
				 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
				 *
				 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
				 *
				 * @param {Element} element
				 * @returns {string}
				 */
				getLanguage: function (element) {
					while (element) {
						var m = lang.exec(element.className);
						if (m) {
							return m[1].toLowerCase();
						}
						element = element.parentElement;
					}
					return 'none';
				},

				/**
				 * Sets the Prism `language-xxxx` class of the given element.
				 *
				 * @param {Element} element
				 * @param {string} language
				 * @returns {void}
				 */
				setLanguage: function (element, language) {
					// remove all `language-xxxx` classes
					// (this might leave behind a leading space)
					element.className = element.className.replace(RegExp(lang, 'gi'), '');

					// add the new `language-xxxx` class
					// (using `classList` will automatically clean up spaces for us)
					element.classList.add('language-' + language);
				},

				/**
				 * Returns the script element that is currently executing.
				 *
				 * This does __not__ work for line script element.
				 *
				 * @returns {HTMLScriptElement | null}
				 */
				currentScript: function () {
					if (typeof document === 'undefined') {
						return null;
					}
					if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
						return /** @type {any} */ (document.currentScript);
					}

					// IE11 workaround
					// we'll get the src of the current script by parsing IE11's error stack trace
					// this will not work for inline scripts

					try {
						throw new Error();
					} catch (err) {
						// Get file src url from stack. Specifically works with the format of stack traces in IE.
						// A stack will look like this:
						//
						// Error
						//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
						//    at Global code (http://localhost/components/prism-core.js:606:1)

						var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
						if (src) {
							var scripts = document.getElementsByTagName('script');
							for (var i in scripts) {
								if (scripts[i].src == src) {
									return scripts[i];
								}
							}
						}
						return null;
					}
				},

				/**
				 * Returns whether a given class is active for `element`.
				 *
				 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
				 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
				 * given class is just the given class with a `no-` prefix.
				 *
				 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
				 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
				 * ancestors have the given class or the negated version of it, then the default activation will be returned.
				 *
				 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
				 * version of it, the class is considered active.
				 *
				 * @param {Element} element
				 * @param {string} className
				 * @param {boolean} [defaultActivation=false]
				 * @returns {boolean}
				 */
				isActive: function (element, className, defaultActivation) {
					var no = 'no-' + className;

					while (element) {
						var classList = element.classList;
						if (classList.contains(className)) {
							return true;
						}
						if (classList.contains(no)) {
							return false;
						}
						element = element.parentElement;
					}
					return !!defaultActivation;
				}
			},

			/**
			 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
			 *
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			languages: {
				/**
				 * The grammar for plain, unformatted text.
				 */
				plain: plainTextGrammar,
				plaintext: plainTextGrammar,
				text: plainTextGrammar,
				txt: plainTextGrammar,

				/**
				 * Creates a deep copy of the language with the given id and appends the given tokens.
				 *
				 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
				 * will be overwritten at its original position.
				 *
				 * ## Best practices
				 *
				 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
				 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
				 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
				 *
				 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
				 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
				 *
				 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
				 * @param {Grammar} redef The new tokens to append.
				 * @returns {Grammar} The new language created.
				 * @public
				 * @example
				 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
				 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
				 *     // at its original position
				 *     'comment': { ... },
				 *     // CSS doesn't have a 'color' token, so this token will be appended
				 *     'color': /\b(?:red|green|blue)\b/
				 * });
				 */
				extend: function (id, redef) {
					var lang = _.util.clone(_.languages[id]);

					for (var key in redef) {
						lang[key] = redef[key];
					}

					return lang;
				},

				/**
				 * Inserts tokens _before_ another token in a language definition or any other grammar.
				 *
				 * ## Usage
				 *
				 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
				 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
				 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
				 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
				 * this:
				 *
				 * ```js
				 * Prism.languages.markup.style = {
				 *     // token
				 * };
				 * ```
				 *
				 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
				 * before existing tokens. For the CSS example above, you would use it like this:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'cdata', {
				 *     'style': {
				 *         // token
				 *     }
				 * });
				 * ```
				 *
				 * ## Special cases
				 *
				 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
				 * will be ignored.
				 *
				 * This behavior can be used to insert tokens after `before`:
				 *
				 * ```js
				 * Prism.languages.insertBefore('markup', 'comment', {
				 *     'comment': Prism.languages.markup.comment,
				 *     // tokens after 'comment'
				 * });
				 * ```
				 *
				 * ## Limitations
				 *
				 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
				 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
				 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
				 * deleting properties which is necessary to insert at arbitrary positions.
				 *
				 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
				 * Instead, it will create a new object and replace all references to the target object with the new one. This
				 * can be done without temporarily deleting properties, so the iteration order is well-defined.
				 *
				 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
				 * you hold the target object in a variable, then the value of the variable will not change.
				 *
				 * ```js
				 * var oldMarkup = Prism.languages.markup;
				 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
				 *
				 * assert(oldMarkup !== Prism.languages.markup);
				 * assert(newMarkup === Prism.languages.markup);
				 * ```
				 *
				 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
				 * object to be modified.
				 * @param {string} before The key to insert before.
				 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
				 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
				 * object to be modified.
				 *
				 * Defaults to `Prism.languages`.
				 * @returns {Grammar} The new grammar object.
				 * @public
				 */
				insertBefore: function (inside, before, insert, root) {
					root = root || /** @type {any} */ (_.languages);
					var grammar = root[inside];
					/** @type {Grammar} */
					var ret = {};

					for (var token in grammar) {
						if (grammar.hasOwnProperty(token)) {

							if (token == before) {
								for (var newToken in insert) {
									if (insert.hasOwnProperty(newToken)) {
										ret[newToken] = insert[newToken];
									}
								}
							}

							// Do not insert token which also occur in insert. See #1525
							if (!insert.hasOwnProperty(token)) {
								ret[token] = grammar[token];
							}
						}
					}

					var old = root[inside];
					root[inside] = ret;

					// Update references in other language definitions
					_.languages.DFS(_.languages, function (key, value) {
						if (value === old && key != inside) {
							this[key] = ret;
						}
					});

					return ret;
				},

				// Traverse a language definition with Depth First Search
				DFS: function DFS(o, callback, type, visited) {
					visited = visited || {};

					var objId = _.util.objId;

					for (var i in o) {
						if (o.hasOwnProperty(i)) {
							callback.call(o, i, o[i], type || i);

							var property = o[i];
							var propertyType = _.util.type(property);

							if (propertyType === 'Object' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, null, visited);
							} else if (propertyType === 'Array' && !visited[objId(property)]) {
								visited[objId(property)] = true;
								DFS(property, callback, i, visited);
							}
						}
					}
				}
			},

			plugins: {},

			/**
			 * This is the most high-level function in Prism’s API.
			 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
			 * each one of them.
			 *
			 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
			 *
			 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
			 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
			 * @memberof Prism
			 * @public
			 */
			highlightAll: function (async, callback) {
				_.highlightAllUnder(document, async, callback);
			},

			/**
			 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
			 * {@link Prism.highlightElement} on each one of them.
			 *
			 * The following hooks will be run:
			 * 1. `before-highlightall`
			 * 2. `before-all-elements-highlight`
			 * 3. All hooks of {@link Prism.highlightElement} for each element.
			 *
			 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
			 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
			 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
			 * @memberof Prism
			 * @public
			 */
			highlightAllUnder: function (container, async, callback) {
				var env = {
					callback: callback,
					container: container,
					selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
				};

				_.hooks.run('before-highlightall', env);

				env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

				_.hooks.run('before-all-elements-highlight', env);

				for (var i = 0, element; (element = env.elements[i++]);) {
					_.highlightElement(element, async === true, env.callback);
				}
			},

			/**
			 * Highlights the code inside a single element.
			 *
			 * The following hooks will be run:
			 * 1. `before-sanity-check`
			 * 2. `before-highlight`
			 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
			 * 4. `before-insert`
			 * 5. `after-highlight`
			 * 6. `complete`
			 *
			 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
			 * the element's language.
			 *
			 * @param {Element} element The element containing the code.
			 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
			 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
			 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
			 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
			 *
			 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
			 * asynchronous highlighting to work. You can build your own bundle on the
			 * [Download page](https://prismjs.com/download.html).
			 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
			 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
			 * @memberof Prism
			 * @public
			 */
			highlightElement: function (element, async, callback) {
				// Find language
				var language = _.util.getLanguage(element);
				var grammar = _.languages[language];

				// Set language on the element, if not present
				_.util.setLanguage(element, language);

				// Set language on the parent, for styling
				var parent = element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre') {
					_.util.setLanguage(parent, language);
				}

				var code = element.textContent;

				var env = {
					element: element,
					language: language,
					grammar: grammar,
					code: code
				};

				function insertHighlightedCode(highlightedCode) {
					env.highlightedCode = highlightedCode;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
				}

				_.hooks.run('before-sanity-check', env);

				// plugins may change/add the parent/element
				parent = env.element.parentElement;
				if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
					parent.setAttribute('tabindex', '0');
				}

				if (!env.code) {
					_.hooks.run('complete', env);
					callback && callback.call(env.element);
					return;
				}

				_.hooks.run('before-highlight', env);

				if (!env.grammar) {
					insertHighlightedCode(_.util.encode(env.code));
					return;
				}

				if (async && _self.Worker) {
					var worker = new Worker(_.filename);

					worker.onmessage = function (evt) {
						insertHighlightedCode(evt.data);
					};

					worker.postMessage(JSON.stringify({
						language: env.language,
						code: env.code,
						immediateClose: true
					}));
				} else {
					insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
				}
			},

			/**
			 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
			 * and the language definitions to use, and returns a string with the HTML produced.
			 *
			 * The following hooks will be run:
			 * 1. `before-tokenize`
			 * 2. `after-tokenize`
			 * 3. `wrap`: On each {@link Token}.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @param {string} language The name of the language definition passed to `grammar`.
			 * @returns {string} The highlighted HTML.
			 * @memberof Prism
			 * @public
			 * @example
			 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
			 */
			highlight: function (text, grammar, language) {
				var env = {
					code: text,
					grammar: grammar,
					language: language
				};
				_.hooks.run('before-tokenize', env);
				if (!env.grammar) {
					throw new Error('The language "' + env.language + '" has no grammar.');
				}
				env.tokens = _.tokenize(env.code, env.grammar);
				_.hooks.run('after-tokenize', env);
				return Token.stringify(_.util.encode(env.tokens), env.language);
			},

			/**
			 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
			 * and the language definitions to use, and returns an array with the tokenized code.
			 *
			 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
			 *
			 * This method could be useful in other contexts as well, as a very crude parser.
			 *
			 * @param {string} text A string with the code to be highlighted.
			 * @param {Grammar} grammar An object containing the tokens to use.
			 *
			 * Usually a language definition like `Prism.languages.markup`.
			 * @returns {TokenStream} An array of strings and tokens, a token stream.
			 * @memberof Prism
			 * @public
			 * @example
			 * let code = `var foo = 0;`;
			 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
			 * tokens.forEach(token => {
			 *     if (token instanceof Prism.Token && token.type === 'number') {
			 *         console.log(`Found numeric literal: ${token.content}`);
			 *     }
			 * });
			 */
			tokenize: function (text, grammar) {
				var rest = grammar.rest;
				if (rest) {
					for (var token in rest) {
						grammar[token] = rest[token];
					}

					delete grammar.rest;
				}

				var tokenList = new LinkedList();
				addAfter(tokenList, tokenList.head, text);

				matchGrammar(text, tokenList, grammar, tokenList.head, 0);

				return toArray(tokenList);
			},

			/**
			 * @namespace
			 * @memberof Prism
			 * @public
			 */
			hooks: {
				all: {},

				/**
				 * Adds the given callback to the list of callbacks for the given hook.
				 *
				 * The callback will be invoked when the hook it is registered for is run.
				 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
				 *
				 * One callback function can be registered to multiple hooks and the same hook multiple times.
				 *
				 * @param {string} name The name of the hook.
				 * @param {HookCallback} callback The callback function which is given environment variables.
				 * @public
				 */
				add: function (name, callback) {
					var hooks = _.hooks.all;

					hooks[name] = hooks[name] || [];

					hooks[name].push(callback);
				},

				/**
				 * Runs a hook invoking all registered callbacks with the given environment variables.
				 *
				 * Callbacks will be invoked synchronously and in the order in which they were registered.
				 *
				 * @param {string} name The name of the hook.
				 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
				 * @public
				 */
				run: function (name, env) {
					var callbacks = _.hooks.all[name];

					if (!callbacks || !callbacks.length) {
						return;
					}

					for (var i = 0, callback; (callback = callbacks[i++]);) {
						callback(env);
					}
				}
			},

			Token: Token
		};
		_self.Prism = _;


		// Typescript note:
		// The following can be used to import the Token type in JSDoc:
		//
		//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

		/**
		 * Creates a new token.
		 *
		 * @param {string} type See {@link Token#type type}
		 * @param {string | TokenStream} content See {@link Token#content content}
		 * @param {string|string[]} [alias] The alias(es) of the token.
		 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
		 * @class
		 * @global
		 * @public
		 */
		function Token(type, content, alias, matchedStr) {
			/**
			 * The type of the token.
			 *
			 * This is usually the key of a pattern in a {@link Grammar}.
			 *
			 * @type {string}
			 * @see GrammarToken
			 * @public
			 */
			this.type = type;
			/**
			 * The strings or tokens contained by this token.
			 *
			 * This will be a token stream if the pattern matched also defined an `inside` grammar.
			 *
			 * @type {string | TokenStream}
			 * @public
			 */
			this.content = content;
			/**
			 * The alias(es) of the token.
			 *
			 * @type {string|string[]}
			 * @see GrammarToken
			 * @public
			 */
			this.alias = alias;
			// Copy of the full string this token was created from
			this.length = (matchedStr || '').length | 0;
		}

		/**
		 * A token stream is an array of strings and {@link Token Token} objects.
		 *
		 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
		 * them.
		 *
		 * 1. No adjacent strings.
		 * 2. No empty strings.
		 *
		 *    The only exception here is the token stream that only contains the empty string and nothing else.
		 *
		 * @typedef {Array<string | Token>} TokenStream
		 * @global
		 * @public
		 */

		/**
		 * Converts the given token or token stream to an HTML representation.
		 *
		 * The following hooks will be run:
		 * 1. `wrap`: On each {@link Token}.
		 *
		 * @param {string | Token | TokenStream} o The token or token stream to be converted.
		 * @param {string} language The name of current language.
		 * @returns {string} The HTML representation of the token or token stream.
		 * @memberof Token
		 * @static
		 */
		Token.stringify = function stringify(o, language) {
			if (typeof o == 'string') {
				return o;
			}
			if (Array.isArray(o)) {
				var s = '';
				o.forEach(function (e) {
					s += stringify(e, language);
				});
				return s;
			}

			var env = {
				type: o.type,
				content: stringify(o.content, language),
				tag: 'span',
				classes: ['token', o.type],
				attributes: {},
				language: language
			};

			var aliases = o.alias;
			if (aliases) {
				if (Array.isArray(aliases)) {
					Array.prototype.push.apply(env.classes, aliases);
				} else {
					env.classes.push(aliases);
				}
			}

			_.hooks.run('wrap', env);

			var attributes = '';
			for (var name in env.attributes) {
				attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
			}

			return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
		};

		/**
		 * @param {RegExp} pattern
		 * @param {number} pos
		 * @param {string} text
		 * @param {boolean} lookbehind
		 * @returns {RegExpExecArray | null}
		 */
		function matchPattern(pattern, pos, text, lookbehind) {
			pattern.lastIndex = pos;
			var match = pattern.exec(text);
			if (match && lookbehind && match[1]) {
				// change the match to remove the text matched by the Prism lookbehind group
				var lookbehindLength = match[1].length;
				match.index += lookbehindLength;
				match[0] = match[0].slice(lookbehindLength);
			}
			return match;
		}

		/**
		 * @param {string} text
		 * @param {LinkedList<string | Token>} tokenList
		 * @param {any} grammar
		 * @param {LinkedListNode<string | Token>} startNode
		 * @param {number} startPos
		 * @param {RematchOptions} [rematch]
		 * @returns {void}
		 * @private
		 *
		 * @typedef RematchOptions
		 * @property {string} cause
		 * @property {number} reach
		 */
		function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
			for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				var patterns = grammar[token];
				patterns = Array.isArray(patterns) ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					if (rematch && rematch.cause == token + ',' + j) {
						return;
					}

					var patternObj = patterns[j];
					var inside = patternObj.inside;
					var lookbehind = !!patternObj.lookbehind;
					var greedy = !!patternObj.greedy;
					var alias = patternObj.alias;

					if (greedy && !patternObj.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
						patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
					}

					/** @type {RegExp} */
					var pattern = patternObj.pattern || patternObj;

					for ( // iterate the token list and keep track of the current token/string position
						var currentNode = startNode.next, pos = startPos;
						currentNode !== tokenList.tail;
						pos += currentNode.value.length, currentNode = currentNode.next
					) {

						if (rematch && pos >= rematch.reach) {
							break;
						}

						var str = currentNode.value;

						if (tokenList.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							return;
						}

						if (str instanceof Token) {
							continue;
						}

						var removeCount = 1; // this is the to parameter of removeBetween
						var match;

						if (greedy) {
							match = matchPattern(pattern, pos, text, lookbehind);
							if (!match || match.index >= text.length) {
								break;
							}

							var from = match.index;
							var to = match.index + match[0].length;
							var p = pos;

							// find the node that contains the match
							p += currentNode.value.length;
							while (from >= p) {
								currentNode = currentNode.next;
								p += currentNode.value.length;
							}
							// adjust pos (and p)
							p -= currentNode.value.length;
							pos = p;

							// the current node is a Token, then the match starts inside another Token, which is invalid
							if (currentNode.value instanceof Token) {
								continue;
							}

							// find the last node which is affected by this match
							for (
								var k = currentNode;
								k !== tokenList.tail && (p < to || typeof k.value === 'string');
								k = k.next
							) {
								removeCount++;
								p += k.value.length;
							}
							removeCount--;

							// replace with the new match
							str = text.slice(pos, p);
							match.index -= pos;
						} else {
							match = matchPattern(pattern, 0, str, lookbehind);
							if (!match) {
								continue;
							}
						}

						// eslint-disable-next-line no-redeclare
						var from = match.index;
						var matchStr = match[0];
						var before = str.slice(0, from);
						var after = str.slice(from + matchStr.length);

						var reach = pos + str.length;
						if (rematch && reach > rematch.reach) {
							rematch.reach = reach;
						}

						var removeFrom = currentNode.prev;

						if (before) {
							removeFrom = addAfter(tokenList, removeFrom, before);
							pos += before.length;
						}

						removeRange(tokenList, removeFrom, removeCount);

						var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
						currentNode = addAfter(tokenList, removeFrom, wrapped);

						if (after) {
							addAfter(tokenList, currentNode, after);
						}

						if (removeCount > 1) {
							// at least one Token object was removed, so we have to do some rematching
							// this can only happen if the current pattern is greedy

							/** @type {RematchOptions} */
							var nestedRematch = {
								cause: token + ',' + j,
								reach: reach
							};
							matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

							// the reach might have been extended because of the rematching
							if (rematch && nestedRematch.reach > rematch.reach) {
								rematch.reach = nestedRematch.reach;
							}
						}
					}
				}
			}
		}

		/**
		 * @typedef LinkedListNode
		 * @property {T} value
		 * @property {LinkedListNode<T> | null} prev The previous node.
		 * @property {LinkedListNode<T> | null} next The next node.
		 * @template T
		 * @private
		 */

		/**
		 * @template T
		 * @private
		 */
		function LinkedList() {
			/** @type {LinkedListNode<T>} */
			var head = { value: null, prev: null, next: null };
			/** @type {LinkedListNode<T>} */
			var tail = { value: null, prev: head, next: null };
			head.next = tail;

			/** @type {LinkedListNode<T>} */
			this.head = head;
			/** @type {LinkedListNode<T>} */
			this.tail = tail;
			this.length = 0;
		}

		/**
		 * Adds a new node with the given value to the list.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {T} value
		 * @returns {LinkedListNode<T>} The added node.
		 * @template T
		 */
		function addAfter(list, node, value) {
			// assumes that node != list.tail && values.length >= 0
			var next = node.next;

			var newNode = { value: value, prev: node, next: next };
			node.next = newNode;
			next.prev = newNode;
			list.length++;

			return newNode;
		}
		/**
		 * Removes `count` nodes after the given node. The given node will not be removed.
		 *
		 * @param {LinkedList<T>} list
		 * @param {LinkedListNode<T>} node
		 * @param {number} count
		 * @template T
		 */
		function removeRange(list, node, count) {
			var next = node.next;
			for (var i = 0; i < count && next !== list.tail; i++) {
				next = next.next;
			}
			node.next = next;
			next.prev = node;
			list.length -= i;
		}
		/**
		 * @param {LinkedList<T>} list
		 * @returns {T[]}
		 * @template T
		 */
		function toArray(list) {
			var array = [];
			var node = list.head.next;
			while (node !== list.tail) {
				array.push(node.value);
				node = node.next;
			}
			return array;
		}


		if (!_self.document) {
			if (!_self.addEventListener) {
				// in Node.js
				return _;
			}

			if (!_.disableWorkerMessageHandler) {
				// In worker
				_self.addEventListener('message', function (evt) {
					var message = JSON.parse(evt.data);
					var lang = message.language;
					var code = message.code;
					var immediateClose = message.immediateClose;

					_self.postMessage(_.highlight(code, _.languages[lang], lang));
					if (immediateClose) {
						_self.close();
					}
				}, false);
			}

			return _;
		}

		// Get current script and highlight
		var script = _.util.currentScript();

		if (script) {
			_.filename = script.src;

			if (script.hasAttribute('data-manual')) {
				_.manual = true;
			}
		}

		function highlightAutomaticallyCallback() {
			if (!_.manual) {
				_.highlightAll();
			}
		}

		if (!_.manual) {
			// If the document state is "loading", then we'll use DOMContentLoaded.
			// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
			// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
			// might take longer one animation frame to execute which can create a race condition where only some plugins have
			// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
			// See https://github.com/PrismJS/prism/issues/2102
			var readyState = document.readyState;
			if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
				document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
			} else {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(highlightAutomaticallyCallback);
				} else {
					window.setTimeout(highlightAutomaticallyCallback, 16);
				}
			}
		}

		return _;

	}(_self));

	if (module.exports) {
		module.exports = Prism;
	}

	// hack for components to work correctly in node.js
	if (typeof commonjsGlobal !== 'undefined') {
		commonjsGlobal.Prism = Prism;
	}

	// some additional documentation/types

	/**
	 * The expansion of a simple `RegExp` literal to support additional properties.
	 *
	 * @typedef GrammarToken
	 * @property {RegExp} pattern The regular expression of the token.
	 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
	 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
	 * @property {boolean} [greedy=false] Whether the token is greedy.
	 * @property {string|string[]} [alias] An optional alias or list of aliases.
	 * @property {Grammar} [inside] The nested grammar of this token.
	 *
	 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
	 *
	 * This can be used to make nested and even recursive language definitions.
	 *
	 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
	 * each another.
	 * @global
	 * @public
	 */

	/**
	 * @typedef Grammar
	 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
	 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
	 * @global
	 * @public
	 */

	/**
	 * A function which will invoked after an element was successfully highlighted.
	 *
	 * @callback HighlightCallback
	 * @param {Element} element The element successfully highlighted.
	 * @returns {void}
	 * @global
	 * @public
	 */

	/**
	 * @callback HookCallback
	 * @param {Object<string, any>} env The environment variables of the hook.
	 * @returns {void}
	 * @global
	 * @public
	 */


	/* **********************************************
	     Begin prism-markup.js
	********************************************** */

	Prism.languages.markup = {
		'comment': {
			pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
			greedy: true
		},
		'prolog': {
			pattern: /<\?[\s\S]+?\?>/,
			greedy: true
		},
		'doctype': {
			// https://www.w3.org/TR/xml/#NT-doctypedecl
			pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
			greedy: true,
			inside: {
				'internal-subset': {
					pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
					lookbehind: true,
					greedy: true,
					inside: null // see below
				},
				'string': {
					pattern: /"[^"]*"|'[^']*'/,
					greedy: true
				},
				'punctuation': /^<!|>$|[[\]]/,
				'doctype-tag': /^DOCTYPE/i,
				'name': /[^\s<>'"]+/
			}
		},
		'cdata': {
			pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
			greedy: true
		},
		'tag': {
			pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
			greedy: true,
			inside: {
				'tag': {
					pattern: /^<\/?[^\s>\/]+/,
					inside: {
						'punctuation': /^<\/?/,
						'namespace': /^[^\s>\/:]+:/
					}
				},
				'special-attr': [],
				'attr-value': {
					pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
					inside: {
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							{
								pattern: /^(\s*)["']|["']$/,
								lookbehind: true
							}
						]
					}
				},
				'punctuation': /\/?>/,
				'attr-name': {
					pattern: /[^\s>\/]+/,
					inside: {
						'namespace': /^[^\s>\/:]+:/
					}
				}

			}
		},
		'entity': [
			{
				pattern: /&[\da-z]{1,8};/i,
				alias: 'named-entity'
			},
			/&#x?[\da-f]{1,8};/i
		]
	};

	Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
		Prism.languages.markup['entity'];
	Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

	// Plugin to make entity title show the real entity, idea by Roman Komarov
	Prism.hooks.add('wrap', function (env) {

		if (env.type === 'entity') {
			env.attributes['title'] = env.content.replace(/&amp;/, '&');
		}
	});

	Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
		/**
		 * Adds an inlined language to markup.
		 *
		 * An example of an inlined language is CSS with `<style>` tags.
		 *
		 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addInlined('style', 'css');
		 */
		value: function addInlined(tagName, lang) {
			var includedCdataInside = {};
			includedCdataInside['language-' + lang] = {
				pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
				lookbehind: true,
				inside: Prism.languages[lang]
			};
			includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

			var inside = {
				'included-cdata': {
					pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
					inside: includedCdataInside
				}
			};
			inside['language-' + lang] = {
				pattern: /[\s\S]+/,
				inside: Prism.languages[lang]
			};

			var def = {};
			def[tagName] = {
				pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
				lookbehind: true,
				greedy: true,
				inside: inside
			};

			Prism.languages.insertBefore('markup', 'cdata', def);
		}
	});
	Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
		/**
		 * Adds an pattern to highlight languages embedded in HTML attributes.
		 *
		 * An example of an inlined language is CSS with `style` attributes.
		 *
		 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
		 * case insensitive.
		 * @param {string} lang The language key.
		 * @example
		 * addAttribute('style', 'css');
		 */
		value: function (attrName, lang) {
			Prism.languages.markup.tag.inside['special-attr'].push({
				pattern: RegExp(
					/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
					'i'
				),
				lookbehind: true,
				inside: {
					'attr-name': /^[^\s=]+/,
					'attr-value': {
						pattern: /=[\s\S]+/,
						inside: {
							'value': {
								pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
								lookbehind: true,
								alias: [lang, 'language-' + lang],
								inside: Prism.languages[lang]
							},
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								/"|'/
							]
						}
					}
				}
			});
		}
	});

	Prism.languages.html = Prism.languages.markup;
	Prism.languages.mathml = Prism.languages.markup;
	Prism.languages.svg = Prism.languages.markup;

	Prism.languages.xml = Prism.languages.extend('markup', {});
	Prism.languages.ssml = Prism.languages.xml;
	Prism.languages.atom = Prism.languages.xml;
	Prism.languages.rss = Prism.languages.xml;


	/* **********************************************
	     Begin prism-css.js
	********************************************** */

	(function (Prism) {

		var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

		Prism.languages.css = {
			'comment': /\/\*[\s\S]*?\*\//,
			'atrule': {
				pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
				inside: {
					'rule': /^@[\w-]+/,
					'selector-function-argument': {
						pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
						lookbehind: true,
						alias: 'selector'
					},
					'keyword': {
						pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
						lookbehind: true
					}
					// See rest below
				}
			},
			'url': {
				// https://drafts.csswg.org/css-values-3/#urls
				pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
				greedy: true,
				inside: {
					'function': /^url/i,
					'punctuation': /^\(|\)$/,
					'string': {
						pattern: RegExp('^' + string.source + '$'),
						alias: 'url'
					}
				}
			},
			'selector': {
				pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
				lookbehind: true
			},
			'string': {
				pattern: string,
				greedy: true
			},
			'property': {
				pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
				lookbehind: true
			},
			'important': /!important\b/i,
			'function': {
				pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
				lookbehind: true
			},
			'punctuation': /[(){};:,]/
		};

		Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

		var markup = Prism.languages.markup;
		if (markup) {
			markup.tag.addInlined('style', 'css');
			markup.tag.addAttribute('style', 'css');
		}

	}(Prism));


	/* **********************************************
	     Begin prism-clike.js
	********************************************** */

	Prism.languages.clike = {
		'comment': [
			{
				pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
				lookbehind: true,
				greedy: true
			},
			{
				pattern: /(^|[^\\:])\/\/.*/,
				lookbehind: true,
				greedy: true
			}
		],
		'string': {
			pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
			greedy: true
		},
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
			lookbehind: true,
			inside: {
				'punctuation': /[.\\]/
			}
		},
		'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
		'boolean': /\b(?:false|true)\b/,
		'function': /\b\w+(?=\()/,
		'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
		'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
		'punctuation': /[{}[\];(),.:]/
	};


	/* **********************************************
	     Begin prism-javascript.js
	********************************************** */

	Prism.languages.javascript = Prism.languages.extend('clike', {
		'class-name': [
			Prism.languages.clike['class-name'],
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
				lookbehind: true
			}
		],
		'keyword': [
			{
				pattern: /((?:^|\})\s*)catch\b/,
				lookbehind: true
			},
			{
				pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
				lookbehind: true
			},
		],
		// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
		'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
		'number': {
			pattern: RegExp(
				/(^|[^\w$])/.source +
				'(?:' +
				(
					// constant
					/NaN|Infinity/.source +
					'|' +
					// binary integer
					/0[bB][01]+(?:_[01]+)*n?/.source +
					'|' +
					// octal integer
					/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
					'|' +
					// hexadecimal integer
					/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
					'|' +
					// decimal bigint
					/\d+(?:_\d+)*n/.source +
					'|' +
					// decimal number (integer or float) but no bigint
					/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
				) +
				')' +
				/(?![\w$])/.source
			),
			lookbehind: true
		},
		'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
	});

	Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

	Prism.languages.insertBefore('javascript', 'keyword', {
		'regex': {
			pattern: RegExp(
				// lookbehind
				// eslint-disable-next-line regexp/no-dupe-characters-character-class
				/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
				// Regex pattern:
				// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
				// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
				// with the only syntax, so we have to define 2 different regex patterns.
				/\//.source +
				'(?:' +
				/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
				'|' +
				// `v` flag syntax. This supports 3 levels of nested character classes.
				/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
				')' +
				// lookahead
				/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
			),
			lookbehind: true,
			greedy: true,
			inside: {
				'regex-source': {
					pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
					lookbehind: true,
					alias: 'language-regex',
					inside: Prism.languages.regex
				},
				'regex-delimiter': /^\/|\/$/,
				'regex-flags': /^[a-z]+$/,
			}
		},
		// This must be declared before keyword because we use "function" inside the look-forward
		'function-variable': {
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
			alias: 'function'
		},
		'parameter': [
			{
				pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			},
			{
				pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
				lookbehind: true,
				inside: Prism.languages.javascript
			}
		],
		'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
	});

	Prism.languages.insertBefore('javascript', 'string', {
		'hashbang': {
			pattern: /^#!.*/,
			greedy: true,
			alias: 'comment'
		},
		'template-string': {
			pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
			greedy: true,
			inside: {
				'template-punctuation': {
					pattern: /^`|`$/,
					alias: 'string'
				},
				'interpolation': {
					pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
					lookbehind: true,
					inside: {
						'interpolation-punctuation': {
							pattern: /^\$\{|\}$/,
							alias: 'punctuation'
						},
						rest: Prism.languages.javascript
					}
				},
				'string': /[\s\S]+/
			}
		},
		'string-property': {
			pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
			lookbehind: true,
			greedy: true,
			alias: 'property'
		}
	});

	Prism.languages.insertBefore('javascript', 'operator', {
		'literal-property': {
			pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
			lookbehind: true,
			alias: 'property'
		},
	});

	if (Prism.languages.markup) {
		Prism.languages.markup.tag.addInlined('script', 'javascript');

		// add attribute support for all DOM events.
		// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
		Prism.languages.markup.tag.addAttribute(
			/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
			'javascript'
		);
	}

	Prism.languages.js = Prism.languages.javascript;


	/* **********************************************
	     Begin prism-file-highlight.js
	********************************************** */

	(function () {

		if (typeof Prism === 'undefined' || typeof document === 'undefined') {
			return;
		}

		// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
		}

		var LOADING_MESSAGE = 'Loading…';
		var FAILURE_MESSAGE = function (status, message) {
			return '✖ Error ' + status + ' while fetching file: ' + message;
		};
		var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

		var EXTENSIONS = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		var STATUS_ATTR = 'data-src-status';
		var STATUS_LOADING = 'loading';
		var STATUS_LOADED = 'loaded';
		var STATUS_FAILED = 'failed';

		var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
			+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

		/**
		 * Loads the given file.
		 *
		 * @param {string} src The URL or path of the source file to load.
		 * @param {(result: string) => void} success
		 * @param {(reason: string) => void} error
		 */
		function loadFile(src, success, error) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status < 400 && xhr.responseText) {
						success(xhr.responseText);
					} else {
						if (xhr.status >= 400) {
							error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
						} else {
							error(FAILURE_EMPTY_MESSAGE);
						}
					}
				}
			};
			xhr.send(null);
		}

		/**
		 * Parses the given range.
		 *
		 * This returns a range with inclusive ends.
		 *
		 * @param {string | null | undefined} range
		 * @returns {[number, number | undefined] | undefined}
		 */
		function parseRange(range) {
			var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
			if (m) {
				var start = Number(m[1]);
				var comma = m[2];
				var end = m[3];

				if (!comma) {
					return [start, start];
				}
				if (!end) {
					return [start, undefined];
				}
				return [start, Number(end)];
			}
			return undefined;
		}

		Prism.hooks.add('before-highlightall', function (env) {
			env.selector += ', ' + SELECTOR;
		});

		Prism.hooks.add('before-sanity-check', function (env) {
			var pre = /** @type {HTMLPreElement} */ (env.element);
			if (pre.matches(SELECTOR)) {
				env.code = ''; // fast-path the whole thing and go to complete

				pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

				// add code element with loading message
				var code = pre.appendChild(document.createElement('CODE'));
				code.textContent = LOADING_MESSAGE;

				var src = pre.getAttribute('data-src');

				var language = env.language;
				if (language === 'none') {
					// the language might be 'none' because there is no language set;
					// in this case, we want to use the extension as the language
					var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
					language = EXTENSIONS[extension] || extension;
				}

				// set language classes
				Prism.util.setLanguage(code, language);
				Prism.util.setLanguage(pre, language);

				// preload the language
				var autoloader = Prism.plugins.autoloader;
				if (autoloader) {
					autoloader.loadLanguages(language);
				}

				// load file
				loadFile(
					src,
					function (text) {
						// mark as loaded
						pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

						// handle data-range
						var range = parseRange(pre.getAttribute('data-range'));
						if (range) {
							var lines = text.split(/\r\n?|\n/g);

							// the range is one-based and inclusive on both ends
							var start = range[0];
							var end = range[1] == null ? lines.length : range[1];

							if (start < 0) { start += lines.length; }
							start = Math.max(0, Math.min(start - 1, lines.length));
							if (end < 0) { end += lines.length; }
							end = Math.max(0, Math.min(end, lines.length));

							text = lines.slice(start, end).join('\n');

							// add data-start for line numbers
							if (!pre.hasAttribute('data-start')) {
								pre.setAttribute('data-start', String(start + 1));
							}
						}

						// highlight code
						code.textContent = text;
						Prism.highlightElement(code);
					},
					function (error) {
						// mark as failed
						pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

						code.textContent = error;
					}
				);
			}
		});

		Prism.plugins.fileHighlight = {
			/**
			 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
			 *
			 * Note: Elements which are already loaded or currently loading will not be touched by this method.
			 *
			 * @param {ParentNode} [container=document]
			 */
			highlight: function highlight(container) {
				var elements = (container || document).querySelectorAll(SELECTOR);

				for (var i = 0, element; (element = elements[i++]);) {
					Prism.highlightElement(element);
				}
			}
		};

		var logged = false;
		/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
		Prism.fileHighlight = function () {
			if (!logged) {
				console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
				logged = true;
			}
			Prism.plugins.fileHighlight.highlight.apply(this, arguments);
		};

	}()); 
} (prism));

var prismExports = prism.exports;
var Prism$1 = /*@__PURE__*/getDefaultExportFromCjs(prismExports);

function download(text, filename, type = "text/plain") {
  var textFileAsBlob = new Blob([text], { type });
  var downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.innerHTML = "Download File";
  if (window.webkitURL != null) {
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }
  downloadLink.click();
}

function useClipboard() {
  const { t } = useI18n();
  const isCopySupported = computed(() => {
    var _a;
    return !!((_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.writeText);
  });
  const isPasteSupported = computed(() => {
    var _a;
    return !!((_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.readText);
  });
  return { isCopySupported, isPasteSupported, copyToClipboard, pasteFromClipboard };
  async function copyToClipboard(value, notificationStore, message) {
    var _a, _b, _c;
    try {
      await ((_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.writeText(value));
      notificationStore.add({
        title: (_b = message == null ? void 0 : message.success) != null ? _b : t("copy_raw_value_success")
      });
      return true;
    } catch (err) {
      notificationStore.add({
        type: "error",
        title: (_c = message == null ? void 0 : message.fail) != null ? _c : t("copy_raw_value_fail")
      });
      return false;
    }
  }
  async function pasteFromClipboard(notificationStore, message) {
    var _a, _b, _c;
    try {
      const pasteValue = await ((_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.readText());
      notificationStore.add({
        title: (_b = message == null ? void 0 : message.success) != null ? _b : t("paste_raw_value_success")
      });
      return pasteValue;
    } catch (err) {
      notificationStore.add({
        type: "error",
        title: (_c = message == null ? void 0 : message.fail) != null ? _c : t("paste_raw_value_fail")
      });
      return null;
    }
  }
}

var _sfc_main$3 = {
  props: {
    value: String,
    language: String,
    downloadName: String,
    loading: Boolean
  },
  computed: {
    rendered() {
      return Prism$1.highlight(
        this.value,
        Prism$1.languages[this.language],
        this.language
      );
    }
  },
  methods: {
    downloadTypes() {
      download(this.value, this.downloadName, "application/json");
    }
  },
  setup(props) {
    const { useNotificationsStore } = useStores();
    const notificationStore = useNotificationsStore();
    const { t } = useI18n();
    const { isCopySupported, copyToClipboard } = useClipboard();
    async function copyValue() {
      await copyToClipboard(props.value, notificationStore);
    }
    return { isCopySupported, copyValue, t };
  }
};

var css$5 = "\n.code[data-v-0277115e] {\n  display: flex;\n  flex-direction: column;\n  width: 600px;\n  max-width: 100%;\n  margin-top: 10px;\n  margin-bottom: 25px;\n  margin-right: 25px;\n}\n.generate-types-textarea[data-v-0277115e] {\n  position: relative;\n  width: 100%;\n  height: auto;\n  max-height: 65vh;\n  padding: 15px;\n  overflow: auto;\n  background-color: var(--background-input);\n  border: var(--border-width) solid var(--border-normal);\n  border-radius: var(--border-radius);\n  transition: border-color var(--fast) var(--transition);\n}\n.generate-types-textarea[data-v-0277115e]:hover:not(.disabled) {\n  border-color: var(--border-normal-alt);\n}\n.generate-types-textarea[data-v-0277115e]:focus:not(.disabled),\n.generate-types-textarea[data-v-0277115e]:focus-within:not(.disabled) {\n  border-color: var(--primary);\n}\n.buttonRow[data-v-0277115e] {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  margin-top: 15px;\n}\n.buttonRow>div[data-v-0277115e] {\n  margin-left: 15px;\n}\n.inline-progress[data-v-0277115e] {\n  --v-progress-circular-size: 1em;\n  display: inline;\n  /* vertical-align: sub; */\n  margin: 0 5px;\n}\n";
n(css$5,{});

var css$4 = "\n.generate-types-textarea,\n.generate-types-textarea * {\n  user-select: text;\n}\n";
n(css$4,{});

const _hoisted_1$3 = { class: "code" };
const _hoisted_2$3 = { class: "generate-types-textarea" };
const _hoisted_3$2 = ["innerHTML"];
const _hoisted_4$1 = { class: "buttonRow" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_progress_circular = resolveComponent("v-progress-circular");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_button = resolveComponent("v-button");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("i", null, [
      createTextVNode(
        toDisplayString($props.downloadName) + " ",
        1
        /* TEXT */
      ),
      $props.loading && $options.rendered ? (openBlock(), createBlock(_component_v_progress_circular, {
        key: 0,
        indeterminate: "",
        class: "inline-progress"
      })) : createCommentVNode("v-if", true)
    ]),
    createElementVNode("div", _hoisted_2$3, [
      $options.rendered ? (openBlock(), createElementBlock("pre", {
        key: 0,
        innerHTML: $options.rendered
      }, null, 8, _hoisted_3$2)) : (openBlock(), createBlock(_component_v_progress_circular, {
        key: 1,
        indeterminate: ""
      }))
    ]),
    createElementVNode("div", _hoisted_4$1, [
      $setup.isCopySupported ? (openBlock(), createBlock(_component_v_button, {
        key: 0,
        class: "copyBtn",
        onClick: $setup.copyValue
      }, {
        default: withCtx(() => [
          createVNode(_component_v_icon, {
            name: "content_copy",
            style: { "margin-right": "8px" },
            disabled: !_ctx.types
          }, null, 8, ["disabled"]),
          createTextVNode(
            " " + toDisplayString($setup.t("copy")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onClick"])) : createCommentVNode("v-if", true),
      this.downloadName ? (openBlock(), createBlock(_component_v_button, {
        key: 1,
        class: "downloadBtn",
        onClick: $options.downloadTypes
      }, {
        default: withCtx(() => [
          createVNode(_component_v_icon, {
            name: "cloud_download",
            style: { "margin-right": "8px" },
            disabled: !_ctx.types
          }, null, 8, ["disabled"]),
          createTextVNode(
            " " + toDisplayString($setup.t("download")),
            1
            /* TEXT */
          )
        ]),
        _: 1
        /* STABLE */
      }, 8, ["onClick"])) : createCommentVNode("v-if", true)
    ])
  ]);
}
var CodeComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-0277115e"], ["__file", "code.vue"]]);

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

async function getCollections(api) {
  const collectionsResponse = await api.get("/collections?limit=-1");
  const fieldsResponse = await api.get(
    "/fields?limit=-1"
  );
  const relationsResponse = await api.get(
    "/relations?limit=-1"
  );
  return gatherCollectionsData(
    collectionsResponse.data.data,
    fieldsResponse.data.data,
    relationsResponse.data.data
  );
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
      ret += getType$1(field, useIntersectionTypes);
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
function getType$1(field, useIntersectionTypes = false) {
  var _a, _b;
  let type;
  if ((_b = (_a = field.meta) == null ? void 0 : _a.options) == null ? void 0 : _b.choices) {
    const choices = field.meta.options.choices.map((choice) => {
      if (typeof choice === "string") {
        return `'${choice}'`;
      } else if (typeof choice === "object" && choice !== null) {
        return `'${choice.value}'`;
      } else {
        throw new Error("Unhandled choices structure: " + JSON.stringify(field, null, 2));
      }
    });
    type = [...new Set(choices)].join(" | ");
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
    type += useIntersectionTypes ? " & " : " | ";
    type += field.relation.collection ? pascalCase(field.relation.collection) : "any";
    if (field.relation.type === "many") {
      type = `(${type})[]`;
    }
  }
  return type;
}

var _sfc_main$2 = {
  components: { NavbarComponent, CodeComponent },
  inject: ["api"],
  data() {
    return {
      types: "",
      languages,
      exampleCode: `import { Directus } from "@directus/sdk";
import { CustomDirectusTypes } from "./types";

const directus = new Directus<CustomDirectusTypes>("<directus url>");`,
      useIntersectionTypes: localStorage.getItem(
        "directus-extension-generate-types-use-intersection-types"
      ) === "true",
      loading: false
    };
  },
  methods: {
    generateTypes() {
      console.log(window.localStorage);
      localStorage.setItem(
        "directus-extension-generate-types-use-intersection-types",
        this.useIntersectionTypes
      );
      generateTsTypes(getCollections(this.api), this.useIntersectionTypes).then((types) => {
        this.types = types;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.generateTypes();
  }
};

var css$3 = "\n.page[data-v-ebd9d33f] {\n  padding: 0 var(--content-padding);\n  display: flex;\n}\n@media (max-width: 1500px) {\n.page[data-v-ebd9d33f] {\n    flex-direction: column;\n}\n}\ncode[data-v-ebd9d33f] {\n  background-color: rgba(0, 0, 0, 0.05);\n  font-size: 0.9em;\n  padding: 3px;\n  border-radius: 4px;\n}\n.type-title[data-v-ebd9d33f] {\n  margin: 10px 0;\n}\na[data-v-ebd9d33f] {\n  color: var(--primary-110);\n  font-weight: 500;\n  text-decoration: none;\n}\na[data-v-ebd9d33f]:hover {\n  text-decoration: underline;\n}\n";
n(css$3,{});

const _withScopeId$1 = (n) => (pushScopeId("data-v-ebd9d33f"), n = n(), popScopeId(), n);
const _hoisted_1$2 = ["innerHTML"];
const _hoisted_2$2 = { class: "page" };
const _hoisted_3$1 = { class: "div" };
const _hoisted_4 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode(
  "p",
  null,
  [
    /* @__PURE__ */ createTextVNode(" To use these types with the "),
    /* @__PURE__ */ createElementVNode("code", null, "@directus/sdk"),
    /* @__PURE__ */ createTextVNode(", include the "),
    /* @__PURE__ */ createElementVNode("code", null, "types.ts"),
    /* @__PURE__ */ createTextVNode(" like this: ")
  ],
  -1
  /* HOISTED */
));
const _hoisted_5 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode(
  "h3",
  { class: "type-title" },
  "Options",
  -1
  /* HOISTED */
));
const _hoisted_6 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode(
  "span",
  null,
  [
    /* @__PURE__ */ createTextVNode(" Use Intersection Types ("),
    /* @__PURE__ */ createElementVNode("code", null, "&"),
    /* @__PURE__ */ createTextVNode(") instead of Union Types ("),
    /* @__PURE__ */ createElementVNode("code", null, "|"),
    /* @__PURE__ */ createTextVNode(") for relational fields. "),
    /* @__PURE__ */ createElementVNode("a", { href: "https://github.com/maltejur/directus-extension-generate-types/pull/3#issuecomment-1037243032" }, " Learn more ")
  ],
  -1
  /* HOISTED */
));
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NavbarComponent = resolveComponent("NavbarComponent");
  const _component_CodeComponent = resolveComponent("CodeComponent");
  const _component_v_checkbox = resolveComponent("v-checkbox");
  const _component_private_view = resolveComponent("private-view");
  return openBlock(), createBlock(_component_private_view, { title: "Types for TypeScript" }, {
    navigation: withCtx(() => [
      createVNode(_component_NavbarComponent)
    ]),
    "title-outer:prepend": withCtx(() => [
      createElementVNode("div", {
        innerHTML: $data.languages["ts"].logo
      }, null, 8, _hoisted_1$2)
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_2$2, [
        createVNode(_component_CodeComponent, {
          value: $data.types,
          language: "typescript",
          downloadName: "types.ts",
          loading: $data.loading
        }, null, 8, ["value", "loading"]),
        createElementVNode("div", _hoisted_3$1, [
          _hoisted_4,
          createVNode(_component_CodeComponent, {
            value: $data.exampleCode,
            language: "typescript"
          }, null, 8, ["value"]),
          _hoisted_5,
          createVNode(_component_v_checkbox, {
            modelValue: $data.useIntersectionTypes,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.useIntersectionTypes = $event),
            onClick: $options.generateTypes
          }, {
            default: withCtx(() => [
              _hoisted_6
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue", "onClick"])
        ])
      ])
    ]),
    _: 1
    /* STABLE */
  });
}
var TsComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-ebd9d33f"], ["__file", "ts.vue"]]);

async function generateOasTypes(api) {
  const response = await api.get("/server/specs/oas");
  return JSON.stringify(response.data, null, 2);
}

var _sfc_main$1 = {
  components: { NavbarComponent, CodeComponent },
  inject: ["api"],
  data() {
    return {
      types: "",
      languages
    };
  },
  mounted() {
    generateOasTypes(this.api).then((types) => this.types = types);
  }
};

var css$2 = "\n.page[data-v-babf22b6] {\n  padding: 0 var(--content-padding);\n  display: flex;\n}\n@media (max-width: 1500px) {\n.page[data-v-babf22b6] {\n    flex-direction: column;\n}\n}\np[data-v-babf22b6] {\n  max-width: 600px;\n}\na[data-v-babf22b6] {\n  color: var(--primary-110);\n  font-weight: 500;\n  text-decoration: none;\n}\na[data-v-babf22b6]:hover {\n  text-decoration: underline;\n}\n";
n(css$2,{});

const _withScopeId = (n) => (pushScopeId("data-v-babf22b6"), n = n(), popScopeId(), n);
const _hoisted_1$1 = ["innerHTML"];
const _hoisted_2$1 = { class: "page" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode(
  "p",
  null,
  [
    /* @__PURE__ */ createTextVNode(" You can use the OpenAPI Specification to automatically generate a Documentation for your Directus project with something like "),
    /* @__PURE__ */ createElementVNode("a", { href: "https://swagger.io/" }, "Swagger"),
    /* @__PURE__ */ createTextVNode(". ")
  ],
  -1
  /* HOISTED */
));
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NavbarComponent = resolveComponent("NavbarComponent");
  const _component_CodeComponent = resolveComponent("CodeComponent");
  const _component_private_view = resolveComponent("private-view");
  return openBlock(), createBlock(_component_private_view, { title: "OpenAPI Specification" }, {
    navigation: withCtx(() => [
      createVNode(_component_NavbarComponent)
    ]),
    "title-outer:prepend": withCtx(() => [
      createElementVNode("div", {
        innerHTML: $data.languages["oas"].logo
      }, null, 8, _hoisted_1$1)
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_2$1, [
        createVNode(_component_CodeComponent, {
          value: $data.types,
          language: "json",
          downloadName: "oas.json"
        }, null, 8, ["value"]),
        _hoisted_3
      ])
    ]),
    _: 1
    /* STABLE */
  });
}
var OasComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-babf22b6"], ["__file", "oas.vue"]]);

async function generatePyTypes(collections) {
  let ret = "";
  const types = [];
  if (collections instanceof Promise) {
    collections = await collections;
  }
  ret += `from typing import TypedDict

`;
  ret += Object.values(collections).map((collection) => {
    const collectionName = collection.collection;
    const typeName = collectionName.split("_").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join("");
    types.push(`${collectionName}: ${typeName}`);
    return `class ${typeName}(TypedDict):
${Object.values(collection.fields).map((x) => `  ${x.field}: ${getType(x.type)}`).join("\n")}`;
  }).join("\n\n");
  ret += "\n\n";
  ret += `class CustomDirectusTypes(TypedDict):
${types.map((x) => `  ${x}`).join("\n")}
`;
  ret += "\n";
  return ret;
}
function getType(directusType) {
  if (["integer", "bigInteger"].includes(directusType))
    return "int";
  if (["float", "decimal"].includes(directusType))
    return "float";
  if (["boolean"].includes(directusType))
    return "bool";
  return "str";
}

var _sfc_main = {
  components: { NavbarComponent, CodeComponent },
  inject: ["api"],
  data() {
    return {
      types: "",
      languages
    };
  },
  mounted() {
    generatePyTypes(getCollections(this.api)).then((types) => this.types = types);
  }
};

var css$1 = "\n.page[data-v-b2489c40] {\n  padding: 0 var(--content-padding);\n  display: flex;\n}\n@media (max-width: 1500px) {\n.page[data-v-b2489c40] {\n    flex-direction: column;\n}\n}\ncode[data-v-b2489c40] {\n  background-color: rgba(0, 0, 0, 0.05);\n  font-size: 0.9em;\n  padding: 3px;\n  border-radius: 4px;\n}\n";
n(css$1,{});

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = { class: "page" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_NavbarComponent = resolveComponent("NavbarComponent");
  const _component_CodeComponent = resolveComponent("CodeComponent");
  const _component_private_view = resolveComponent("private-view");
  return openBlock(), createBlock(_component_private_view, { title: "Type Hints for Python" }, {
    navigation: withCtx(() => [
      createVNode(_component_NavbarComponent)
    ]),
    "title-outer:prepend": withCtx(() => [
      createElementVNode("div", {
        innerHTML: $data.languages["py"].logo
      }, null, 8, _hoisted_1)
    ]),
    default: withCtx(() => [
      createElementVNode("div", _hoisted_2, [
        createVNode(_component_CodeComponent, {
          value: $data.types,
          language: "python",
          downloadName: "types.py"
        }, null, 8, ["value"])
      ])
    ]),
    _: 1
    /* STABLE */
  });
}
var PyComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b2489c40"], ["__file", "py.vue"]]);

var css = "/**\n * prism.js default theme for JavaScript, CSS and HTML\n * Based on dabblet (http://dabblet.com)\n * @author Lea Verou\n */\n\ncode[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tcolor: black;\n\tbackground: none;\n\ttext-shadow: 0 1px white;\n\tfont-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;\n\tfont-size: 1em;\n\ttext-align: left;\n\twhite-space: pre;\n\tword-spacing: normal;\n\tword-break: normal;\n\tword-wrap: normal;\n\tline-height: 1.5;\n\n\t-moz-tab-size: 4;\n\t-o-tab-size: 4;\n\ttab-size: 4;\n\n\t-webkit-hyphens: none;\n\t-moz-hyphens: none;\n\t-ms-hyphens: none;\n\thyphens: none;\n}\n\npre[class*=\"language-\"]::-moz-selection, pre[class*=\"language-\"] ::-moz-selection,\ncode[class*=\"language-\"]::-moz-selection, code[class*=\"language-\"] ::-moz-selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\npre[class*=\"language-\"]::selection, pre[class*=\"language-\"] ::selection,\ncode[class*=\"language-\"]::selection, code[class*=\"language-\"] ::selection {\n\ttext-shadow: none;\n\tbackground: #b3d4fc;\n}\n\n@media print {\n\tcode[class*=\"language-\"],\n\tpre[class*=\"language-\"] {\n\t\ttext-shadow: none;\n\t}\n}\n\n/* Code blocks */\npre[class*=\"language-\"] {\n\tpadding: 1em;\n\tmargin: .5em 0;\n\toverflow: auto;\n}\n\n:not(pre) > code[class*=\"language-\"],\npre[class*=\"language-\"] {\n\tbackground: #f5f2f0;\n}\n\n/* Inline code */\n:not(pre) > code[class*=\"language-\"] {\n\tpadding: .1em;\n\tborder-radius: .3em;\n\twhite-space: normal;\n}\n\n.token.comment,\n.token.prolog,\n.token.doctype,\n.token.cdata {\n\tcolor: slategray;\n}\n\n.token.punctuation {\n\tcolor: #999;\n}\n\n.token.namespace {\n\topacity: .7;\n}\n\n.token.property,\n.token.tag,\n.token.boolean,\n.token.number,\n.token.constant,\n.token.symbol,\n.token.deleted {\n\tcolor: #905;\n}\n\n.token.selector,\n.token.attr-name,\n.token.string,\n.token.char,\n.token.builtin,\n.token.inserted {\n\tcolor: #690;\n}\n\n.token.operator,\n.token.entity,\n.token.url,\n.language-css .token.string,\n.style .token.string {\n\tcolor: #9a6e3a;\n\t/* This background color was intended by the author of this theme. */\n\tbackground: hsla(0, 0%, 100%, .5);\n}\n\n.token.atrule,\n.token.attr-value,\n.token.keyword {\n\tcolor: #07a;\n}\n\n.token.function,\n.token.class-name {\n\tcolor: #DD4A68;\n}\n\n.token.regex,\n.token.important,\n.token.variable {\n\tcolor: #e90;\n}\n\n.token.important,\n.token.bold {\n\tfont-weight: bold;\n}\n.token.italic {\n\tfont-style: italic;\n}\n\n.token.entity {\n\tcursor: help;\n}\n";
n(css,{});

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	'boolean': /\b(?:false|true)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;

// https://www.json.org/json-en.html
Prism.languages.json = {
	'property': {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
		lookbehind: true,
		greedy: true
	},
	'string': {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
		lookbehind: true,
		greedy: true
	},
	'comment': {
		pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: true
	},
	'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	'punctuation': /[{}[\],]/,
	'operator': /:/,
	'boolean': /\b(?:false|true)\b/,
	'null': {
		pattern: /\bnull\b/,
		alias: 'keyword'
	}
};

Prism.languages.webmanifest = Prism.languages.json;

(function (Prism) {

	Prism.languages.typescript = Prism.languages.extend('javascript', {
		'class-name': {
			pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
			lookbehind: true,
			greedy: true,
			inside: null // see below
		},
		'builtin': /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/,
	});

	// The keywords TypeScript adds to JavaScript
	Prism.languages.typescript.keyword.push(
		/\b(?:abstract|declare|is|keyof|readonly|require)\b/,
		// keywords that have to be followed by an identifier
		/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
		// This is for `import type *, {}`
		/\btype\b(?=\s*(?:[\{*]|$))/
	);

	// doesn't work with TS because TS is too complex
	delete Prism.languages.typescript['parameter'];
	delete Prism.languages.typescript['literal-property'];

	// a version of typescript specifically for highlighting types
	var typeInside = Prism.languages.extend('typescript', {});
	delete typeInside['class-name'];

	Prism.languages.typescript['class-name'].inside = typeInside;

	Prism.languages.insertBefore('typescript', 'function', {
		'decorator': {
			pattern: /@[$\w\xA0-\uFFFF]+/,
			inside: {
				'at': {
					pattern: /^@/,
					alias: 'operator'
				},
				'function': /^[\s\S]+/
			}
		},
		'generic-function': {
			// e.g. foo<T extends "bar" | "baz">( ...
			pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
			greedy: true,
			inside: {
				'function': /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
				'generic': {
					pattern: /<[\s\S]+/, // everything after the first <
					alias: 'class-name',
					inside: typeInside
				}
			}
		}
	});

	Prism.languages.ts = Prism.languages.typescript;

}(Prism));

Prism.languages.python = {
	'comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true,
		greedy: true
	},
	'string-interpolation': {
		pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: true,
		inside: {
			'interpolation': {
				// "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
				pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
				lookbehind: true,
				inside: {
					'format-spec': {
						pattern: /(:)[^:(){}]+(?=\}$)/,
						lookbehind: true
					},
					'conversion-option': {
						pattern: /![sra](?=[:}]$)/,
						alias: 'punctuation'
					},
					rest: null
				}
			},
			'string': /[\s\S]+/
		}
	},
	'triple-quoted-string': {
		pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
		greedy: true,
		alias: 'string'
	},
	'string': {
		pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: true
	},
	'function': {
		pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
		lookbehind: true
	},
	'class-name': {
		pattern: /(\bclass\s+)\w+/i,
		lookbehind: true
	},
	'decorator': {
		pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
		lookbehind: true,
		alias: ['annotation', 'punctuation'],
		inside: {
			'punctuation': /\./
		}
	},
	'keyword': /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
	'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
	'boolean': /\b(?:False|None|True)\b/,
	'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
	'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
	'punctuation': /[{}[\];(),.:]/
};

Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;

Prism.languages.py = Prism.languages.python;

var e0 = {
  id: "generate-types",
  name: "Generate Types",
  icon: "code",
  routes: [
    {
      path: "",
      redirect: "/generate-types/index"
    },
    {
      path: "/generate-types/index",
      component: IndexComponent
    },
    {
      path: "/generate-types/ts",
      component: TsComponent
    },
    {
      path: "/generate-types/oas",
      component: OasComponent
    },
    {
      path: "/generate-types/py",
      component: PyComponent
    }
  ],
  hidden: false,
  preRegisterCheck(user) {
    return user.role.admin_access;
  }
};

const interfaces = [];const displays = [];const layouts = [];const modules = [e0];const panels = [];const operations = [];

export { displays, interfaces, layouts, modules, operations, panels };
