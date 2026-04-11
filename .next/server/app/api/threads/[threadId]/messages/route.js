/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/threads/[threadId]/messages/route";
exports.ids = ["app/api/threads/[threadId]/messages/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&page=%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute.ts&appDir=D%3A%5CResearch%5CaiEnergy%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CResearch%5CaiEnergy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&page=%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute.ts&appDir=D%3A%5CResearch%5CaiEnergy%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CResearch%5CaiEnergy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_Research_aiEnergy_app_api_threads_threadId_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/threads/[threadId]/messages/route.ts */ \"(rsc)/./app/api/threads/[threadId]/messages/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/threads/[threadId]/messages/route\",\n        pathname: \"/api/threads/[threadId]/messages\",\n        filename: \"route\",\n        bundlePath: \"app/api/threads/[threadId]/messages/route\"\n    },\n    resolvedPagePath: \"D:\\\\Research\\\\aiEnergy\\\\app\\\\api\\\\threads\\\\[threadId]\\\\messages\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_Research_aiEnergy_app_api_threads_threadId_messages_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0aHJlYWRzJTJGJTVCdGhyZWFkSWQlNUQlMkZtZXNzYWdlcyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdGhyZWFkcyUyRiU1QnRocmVhZElkJTVEJTJGbWVzc2FnZXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ0aHJlYWRzJTJGJTVCdGhyZWFkSWQlNUQlMkZtZXNzYWdlcyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDUmVzZWFyY2glNUNhaUVuZXJneSU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RCUzQSU1Q1Jlc2VhcmNoJTVDYWlFbmVyZ3kmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3lCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxSZXNlYXJjaFxcXFxhaUVuZXJneVxcXFxhcHBcXFxcYXBpXFxcXHRocmVhZHNcXFxcW3RocmVhZElkXVxcXFxtZXNzYWdlc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdGhyZWFkcy9bdGhyZWFkSWRdL21lc3NhZ2VzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvdGhyZWFkcy9bdGhyZWFkSWRdL21lc3NhZ2VzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS90aHJlYWRzL1t0aHJlYWRJZF0vbWVzc2FnZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxSZXNlYXJjaFxcXFxhaUVuZXJneVxcXFxhcHBcXFxcYXBpXFxcXHRocmVhZHNcXFxcW3RocmVhZElkXVxcXFxtZXNzYWdlc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&page=%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute.ts&appDir=D%3A%5CResearch%5CaiEnergy%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CResearch%5CaiEnergy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/threads/[threadId]/messages/route.ts":
/*!******************************************************!*\
  !*** ./app/api/threads/[threadId]/messages/route.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabase_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabase/server */ \"(rsc)/./lib/supabase/server.ts\");\n\n\nasync function GET(_req, { params }) {\n    const { threadId } = await params;\n    const supabase = await (0,_lib_supabase_server__WEBPACK_IMPORTED_MODULE_1__.createClient)();\n    const { data: { user } } = await supabase.auth.getUser();\n    if (!user) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: \"Unauthorized\"\n    }, {\n        status: 401\n    });\n    const { data, error } = await supabase.from(\"messages\").select(\"*\").eq(\"thread_id\", threadId).order(\"created_at\", {\n        ascending: true\n    });\n    if (error) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        error: error.message\n    }, {\n        status: 500\n    });\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(data);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3RocmVhZHMvW3RocmVhZElkXS9tZXNzYWdlcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0Q7QUFDSDtBQUU5QyxlQUFlRSxJQUNwQkMsSUFBaUIsRUFDakIsRUFBRUMsTUFBTSxFQUE2QztJQUVyRCxNQUFNLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1EO0lBQzNCLE1BQU1FLFdBQVcsTUFBTUwsa0VBQVlBO0lBQ25DLE1BQU0sRUFBRU0sTUFBTSxFQUFFQyxJQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU1GLFNBQVNHLElBQUksQ0FBQ0MsT0FBTztJQUN0RCxJQUFJLENBQUNGLE1BQU0sT0FBT1IscURBQVlBLENBQUNXLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQWUsR0FBRztRQUFFQyxRQUFRO0lBQUk7SUFFN0UsTUFBTSxFQUFFTixJQUFJLEVBQUVLLEtBQUssRUFBRSxHQUFHLE1BQU1OLFNBQzNCUSxJQUFJLENBQUMsWUFDTEMsTUFBTSxDQUFDLEtBQ1BDLEVBQUUsQ0FBQyxhQUFhWCxVQUNoQlksS0FBSyxDQUFDLGNBQWM7UUFBRUMsV0FBVztJQUFLO0lBRXpDLElBQUlOLE9BQU8sT0FBT1oscURBQVlBLENBQUNXLElBQUksQ0FBQztRQUFFQyxPQUFPQSxNQUFNTyxPQUFPO0lBQUMsR0FBRztRQUFFTixRQUFRO0lBQUk7SUFDNUUsT0FBT2IscURBQVlBLENBQUNXLElBQUksQ0FBQ0o7QUFDM0IiLCJzb3VyY2VzIjpbIkQ6XFxSZXNlYXJjaFxcYWlFbmVyZ3lcXGFwcFxcYXBpXFx0aHJlYWRzXFxbdGhyZWFkSWRdXFxtZXNzYWdlc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSBcIkAvbGliL3N1cGFiYXNlL3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKFxuICBfcmVxOiBOZXh0UmVxdWVzdCxcbiAgeyBwYXJhbXMgfTogeyBwYXJhbXM6IFByb21pc2U8eyB0aHJlYWRJZDogc3RyaW5nIH0+IH1cbikge1xuICBjb25zdCB7IHRocmVhZElkIH0gPSBhd2FpdCBwYXJhbXM7XG4gIGNvbnN0IHN1cGFiYXNlID0gYXdhaXQgY3JlYXRlQ2xpZW50KCk7XG4gIGNvbnN0IHsgZGF0YTogeyB1c2VyIH0gfSA9IGF3YWl0IHN1cGFiYXNlLmF1dGguZ2V0VXNlcigpO1xuICBpZiAoIXVzZXIpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG5cbiAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcIm1lc3NhZ2VzXCIpXG4gICAgLnNlbGVjdChcIipcIilcbiAgICAuZXEoXCJ0aHJlYWRfaWRcIiwgdGhyZWFkSWQpXG4gICAgLm9yZGVyKFwiY3JlYXRlZF9hdFwiLCB7IGFzY2VuZGluZzogdHJ1ZSB9KTtcblxuICBpZiAoZXJyb3IpIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihkYXRhKTtcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjcmVhdGVDbGllbnQiLCJHRVQiLCJfcmVxIiwicGFyYW1zIiwidGhyZWFkSWQiLCJzdXBhYmFzZSIsImRhdGEiLCJ1c2VyIiwiYXV0aCIsImdldFVzZXIiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJmcm9tIiwic2VsZWN0IiwiZXEiLCJvcmRlciIsImFzY2VuZGluZyIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/threads/[threadId]/messages/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabase/server.ts":
/*!********************************!*\
  !*** ./lib/supabase/server.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createClient: () => (/* binding */ createClient)\n/* harmony export */ });\n/* harmony import */ var _supabase_ssr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/ssr */ \"(rsc)/./node_modules/@supabase/ssr/dist/module/index.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nasync function createClient() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    return (0,_supabase_ssr__WEBPACK_IMPORTED_MODULE_0__.createServerClient)(\"https://uibxbxlnrbojgxxsqidh.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpYnhieGxucmJvamd4eHNxaWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MTQ5MDUsImV4cCI6MjA5MTM5MDkwNX0.RXqSjlPWFIOM2KhKfQrPmchFmUyuMsw9ngR29OqgCYc\", {\n        cookies: {\n            getAll () {\n                return cookieStore.getAll();\n            },\n            setAll (cookiesToSet) {\n                try {\n                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));\n                } catch  {\n                // Server component — can ignore\n                }\n            }\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2Uvc2VydmVyLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFtRDtBQUNaO0FBRWhDLGVBQWVFO0lBQ3BCLE1BQU1DLGNBQWMsTUFBTUYscURBQU9BO0lBRWpDLE9BQU9ELGlFQUFrQkEsQ0FDdkJJLDBDQUFvQyxFQUNwQ0Esa05BQXlDLEVBQ3pDO1FBQ0VILFNBQVM7WUFDUE87Z0JBQ0UsT0FBT0wsWUFBWUssTUFBTTtZQUMzQjtZQUNBQyxRQUFPQyxZQUFZO2dCQUNqQixJQUFJO29CQUNGQSxhQUFhQyxPQUFPLENBQUMsQ0FBQyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFFLEdBQzVDWCxZQUFZWSxHQUFHLENBQUNILE1BQU1DLE9BQU9DO2dCQUVqQyxFQUFFLE9BQU07Z0JBQ04sZ0NBQWdDO2dCQUNsQztZQUNGO1FBQ0Y7SUFDRjtBQUVKIiwic291cmNlcyI6WyJEOlxcUmVzZWFyY2hcXGFpRW5lcmd5XFxsaWJcXHN1cGFiYXNlXFxzZXJ2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2VydmVyQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zc3JcIjtcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVDbGllbnQoKSB7XG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpO1xuXG4gIHJldHVybiBjcmVhdGVTZXJ2ZXJDbGllbnQoXG4gICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMISxcbiAgICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSEsXG4gICAge1xuICAgICAgY29va2llczoge1xuICAgICAgICBnZXRBbGwoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvb2tpZVN0b3JlLmdldEFsbCgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRBbGwoY29va2llc1RvU2V0KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvb2tpZXNUb1NldC5mb3JFYWNoKCh7IG5hbWUsIHZhbHVlLCBvcHRpb25zIH0pID0+XG4gICAgICAgICAgICAgIGNvb2tpZVN0b3JlLnNldChuYW1lLCB2YWx1ZSwgb3B0aW9ucylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyBTZXJ2ZXIgY29tcG9uZW50IOKAlCBjYW4gaWdub3JlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9XG4gICk7XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlU2VydmVyQ2xpZW50IiwiY29va2llcyIsImNyZWF0ZUNsaWVudCIsImNvb2tpZVN0b3JlIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiZ2V0QWxsIiwic2V0QWxsIiwiY29va2llc1RvU2V0IiwiZm9yRWFjaCIsIm5hbWUiLCJ2YWx1ZSIsIm9wdGlvbnMiLCJzZXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabase/server.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&page=%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fthreads%2F%5BthreadId%5D%2Fmessages%2Froute.ts&appDir=D%3A%5CResearch%5CaiEnergy%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CResearch%5CaiEnergy&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();