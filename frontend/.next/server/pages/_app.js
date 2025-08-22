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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/context/AuthContext.tsx":
/*!*************************************!*\
  !*** ./src/context/AuthContext.tsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthContext: () => (/* binding */ AuthContext),\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/auth */ \"./src/utils/auth.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_auth__WEBPACK_IMPORTED_MODULE_2__]);\n_utils_auth__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({\n    user: null,\n    token: null,\n    login: ()=>{},\n    logout: ()=>{}\n});\nconst AuthProvider = ({ children })=>{\n    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const storedToken = localStorage.getItem(\"token\");\n        if (storedToken && (0,_utils_auth__WEBPACK_IMPORTED_MODULE_2__.isTokenValid)(storedToken)) {\n            const userData = (0,_utils_auth__WEBPACK_IMPORTED_MODULE_2__.getTokenData)(storedToken);\n            setToken(storedToken);\n            setUser({\n                id: userData.id,\n                username: userData.username,\n                role: userData.role\n            });\n        } else {\n            (0,_utils_auth__WEBPACK_IMPORTED_MODULE_2__.removeToken)();\n        }\n    }, []);\n    const login = (newToken)=>{\n        const userData = (0,_utils_auth__WEBPACK_IMPORTED_MODULE_2__.getTokenData)(newToken);\n        setToken(newToken);\n        setUser({\n            id: userData.id,\n            username: userData.username,\n            role: userData.role\n        });\n        localStorage.setItem(\"token\", newToken);\n    };\n    const logout = ()=>{\n        setToken(null);\n        setUser(null);\n        (0,_utils_auth__WEBPACK_IMPORTED_MODULE_2__.removeToken)();\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            user,\n            token,\n            login,\n            logout\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"D:\\\\business-portfolio\\\\company-portfolio-website\\\\frontend\\\\src\\\\context\\\\AuthContext.tsx\",\n        lineNumber: 49,\n        columnNumber: 5\n    }, undefined);\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGV4dC9BdXRoQ29udGV4dC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBNkU7QUFFTDtBQUVqRSxNQUFNTyw0QkFBY04sb0RBQWFBLENBQWtCO0lBQ3hETyxNQUFNO0lBQ05DLE9BQU87SUFDUEMsT0FBTyxLQUFPO0lBQ2RDLFFBQVEsS0FBTztBQUNqQixHQUFHO0FBRUksTUFBTUMsZUFBZSxDQUFDLEVBQUVDLFFBQVEsRUFBMkI7SUFDaEUsTUFBTSxDQUFDSixPQUFPSyxTQUFTLEdBQUdaLCtDQUFRQSxDQUFnQjtJQUNsRCxNQUFNLENBQUNNLE1BQU1PLFFBQVEsR0FBR2IsK0NBQVFBLENBQWM7SUFFOUNDLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTWEsY0FBY0MsYUFBYUMsT0FBTyxDQUFDO1FBQ3pDLElBQUlGLGVBQWVaLHlEQUFZQSxDQUFDWSxjQUFjO1lBQzVDLE1BQU1HLFdBQVdkLHlEQUFZQSxDQUFDVztZQUM5QkYsU0FBU0U7WUFDVEQsUUFBUTtnQkFDTkssSUFBSUQsU0FBU0MsRUFBRTtnQkFDZkMsVUFBVUYsU0FBU0UsUUFBUTtnQkFDM0JDLE1BQU1ILFNBQVNHLElBQUk7WUFDckI7UUFDRixPQUFPO1lBQ0xoQix3REFBV0E7UUFDYjtJQUNGLEdBQUcsRUFBRTtJQUVMLE1BQU1JLFFBQVEsQ0FBQ2E7UUFDYixNQUFNSixXQUFXZCx5REFBWUEsQ0FBQ2tCO1FBQzlCVCxTQUFTUztRQUNUUixRQUFRO1lBQ05LLElBQUlELFNBQVNDLEVBQUU7WUFDZkMsVUFBVUYsU0FBU0UsUUFBUTtZQUMzQkMsTUFBTUgsU0FBU0csSUFBSTtRQUNyQjtRQUNBTCxhQUFhTyxPQUFPLENBQUMsU0FBU0Q7SUFDaEM7SUFFQSxNQUFNWixTQUFTO1FBQ2JHLFNBQVM7UUFDVEMsUUFBUTtRQUNSVCx3REFBV0E7SUFDYjtJQUVBLHFCQUNFLDhEQUFDQyxZQUFZa0IsUUFBUTtRQUFDQyxPQUFPO1lBQUVsQjtZQUFNQztZQUFPQztZQUFPQztRQUFPO2tCQUN2REU7Ozs7OztBQUdQLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb21wYW55LXBvcnRmb2xpby1mcm9udGVuZC8uL3NyYy9jb250ZXh0L0F1dGhDb250ZXh0LnRzeD82ZWU0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFVzZXIsIEF1dGhDb250ZXh0VHlwZSB9IGZyb20gJy4uL3R5cGVzJztcclxuaW1wb3J0IHsgaXNUb2tlblZhbGlkLCBnZXRUb2tlbkRhdGEsIHJlbW92ZVRva2VuIH0gZnJvbSAnLi4vdXRpbHMvYXV0aCc7XHJcblxyXG5leHBvcnQgY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0PEF1dGhDb250ZXh0VHlwZT4oe1xyXG4gIHVzZXI6IG51bGwsXHJcbiAgdG9rZW46IG51bGwsXHJcbiAgbG9naW46ICgpID0+IHt9LFxyXG4gIGxvZ291dDogKCkgPT4ge30sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlciA9ICh7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0Tm9kZSB9KSA9PiB7XHJcbiAgY29uc3QgW3Rva2VuLCBzZXRUb2tlbl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBzdG9yZWRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG4gICAgaWYgKHN0b3JlZFRva2VuICYmIGlzVG9rZW5WYWxpZChzdG9yZWRUb2tlbikpIHtcclxuICAgICAgY29uc3QgdXNlckRhdGEgPSBnZXRUb2tlbkRhdGEoc3RvcmVkVG9rZW4pIGFzIGFueTtcclxuICAgICAgc2V0VG9rZW4oc3RvcmVkVG9rZW4pO1xyXG4gICAgICBzZXRVc2VyKHtcclxuICAgICAgICBpZDogdXNlckRhdGEuaWQsXHJcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJEYXRhLnVzZXJuYW1lLFxyXG4gICAgICAgIHJvbGU6IHVzZXJEYXRhLnJvbGVcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZW1vdmVUb2tlbigpO1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbG9naW4gPSAobmV3VG9rZW46IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgdXNlckRhdGEgPSBnZXRUb2tlbkRhdGEobmV3VG9rZW4pIGFzIGFueTtcclxuICAgIHNldFRva2VuKG5ld1Rva2VuKTtcclxuICAgIHNldFVzZXIoe1xyXG4gICAgICBpZDogdXNlckRhdGEuaWQsXHJcbiAgICAgIHVzZXJuYW1lOiB1c2VyRGF0YS51c2VybmFtZSxcclxuICAgICAgcm9sZTogdXNlckRhdGEucm9sZVxyXG4gICAgfSk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBuZXdUb2tlbik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgc2V0VG9rZW4obnVsbCk7XHJcbiAgICBzZXRVc2VyKG51bGwpO1xyXG4gICAgcmVtb3ZlVG9rZW4oKTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHVzZXIsIHRva2VuLCBsb2dpbiwgbG9nb3V0IH19PlxyXG4gICAgICB7Y2hpbGRyZW59XHJcbiAgICA8L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxyXG4gICk7XHJcbn07XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImlzVG9rZW5WYWxpZCIsImdldFRva2VuRGF0YSIsInJlbW92ZVRva2VuIiwiQXV0aENvbnRleHQiLCJ1c2VyIiwidG9rZW4iLCJsb2dpbiIsImxvZ291dCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwic2V0VG9rZW4iLCJzZXRVc2VyIiwic3RvcmVkVG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwidXNlckRhdGEiLCJpZCIsInVzZXJuYW1lIiwicm9sZSIsIm5ld1Rva2VuIiwic2V0SXRlbSIsIlByb3ZpZGVyIiwidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/context/AuthContext.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_theme_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/theme.css */ \"./src/styles/theme.css\");\n/* harmony import */ var _styles_theme_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_theme_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_animations_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/animations.css */ \"./src/styles/animations.css\");\n/* harmony import */ var _styles_animations_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_animations_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _context_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/AuthContext */ \"./src/context/AuthContext.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__]);\n_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n// import PageTransition from '../components/PageTransition'; // Already commented out ✓\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_AuthContext__WEBPACK_IMPORTED_MODULE_4__.AuthProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"D:\\\\business-portfolio\\\\company-portfolio-website\\\\frontend\\\\src\\\\pages\\\\_app.tsx\",\n            lineNumber: 12,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"D:\\\\business-portfolio\\\\company-portfolio-website\\\\frontend\\\\src\\\\pages\\\\_app.tsx\",\n        lineNumber: 10,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0I7QUFDRjtBQUNLO0FBRW9CO0FBQ3RELHdGQUF3RjtBQUV4RixTQUFTQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQy9DLHFCQUNFLDhEQUFDSCw4REFBWUE7a0JBRVgsNEVBQUNFO1lBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7QUFHOUI7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbXBhbnktcG9ydGZvbGlvLWZyb250ZW5kLy4vc3JjL3BhZ2VzL19hcHAudHN4P2Y5ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy90aGVtZS5jc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9hbmltYXRpb25zLmNzcyc7XHJcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XHJcbmltcG9ydCB7IEF1dGhQcm92aWRlciB9IGZyb20gJy4uL2NvbnRleHQvQXV0aENvbnRleHQnO1xyXG4vLyBpbXBvcnQgUGFnZVRyYW5zaXRpb24gZnJvbSAnLi4vY29tcG9uZW50cy9QYWdlVHJhbnNpdGlvbic7IC8vIEFscmVhZHkgY29tbWVudGVkIG91dCDinJNcclxuXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEF1dGhQcm92aWRlcj5cclxuICAgICAgey8qIFJlbW92ZSB0aGlzIGxpbmU6IDxQYWdlVHJhbnNpdGlvbiAvPiAqL31cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9BdXRoUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XHJcbiJdLCJuYW1lcyI6WyJBdXRoUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/utils/auth.ts":
/*!***************************!*\
  !*** ./src/utils/auth.ts ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getToken: () => (/* binding */ getToken),\n/* harmony export */   getTokenData: () => (/* binding */ getTokenData),\n/* harmony export */   isTokenValid: () => (/* binding */ isTokenValid),\n/* harmony export */   removeToken: () => (/* binding */ removeToken),\n/* harmony export */   setToken: () => (/* binding */ setToken)\n/* harmony export */ });\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ \"jwt-decode\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([jwt_decode__WEBPACK_IMPORTED_MODULE_0__]);\njwt_decode__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst isTokenValid = (token)=>{\n    try {\n        const decoded = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_0__.jwtDecode)(token);\n        return decoded.exp * 1000 > Date.now();\n    } catch  {\n        return false;\n    }\n};\nconst getTokenData = (token)=>{\n    try {\n        return (0,jwt_decode__WEBPACK_IMPORTED_MODULE_0__.jwtDecode)(token);\n    } catch  {\n        return null;\n    }\n};\nconst removeToken = ()=>{\n    localStorage.removeItem(\"token\");\n};\nconst setToken = (token)=>{\n    localStorage.setItem(\"token\", token);\n};\nconst getToken = ()=>{\n    return localStorage.getItem(\"token\");\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBcUM7QUFFOUIsTUFBTUMsZUFBZSxDQUFDQztJQUMzQixJQUFJO1FBQ0YsTUFBTUMsVUFBZUgscURBQVNBLENBQUNFO1FBQy9CLE9BQU9DLFFBQVFDLEdBQUcsR0FBRyxPQUFPQyxLQUFLQyxHQUFHO0lBQ3RDLEVBQUUsT0FBTTtRQUNOLE9BQU87SUFDVDtBQUNGLEVBQUU7QUFFSyxNQUFNQyxlQUFlLENBQUNMO0lBQzNCLElBQUk7UUFDRixPQUFPRixxREFBU0EsQ0FBQ0U7SUFDbkIsRUFBRSxPQUFNO1FBQ04sT0FBTztJQUNUO0FBQ0YsRUFBRTtBQUVLLE1BQU1NLGNBQWM7SUFDekJDLGFBQWFDLFVBQVUsQ0FBQztBQUMxQixFQUFFO0FBRUssTUFBTUMsV0FBVyxDQUFDVDtJQUN2Qk8sYUFBYUcsT0FBTyxDQUFDLFNBQVNWO0FBQ2hDLEVBQUU7QUFFSyxNQUFNVyxXQUFXO0lBQ3RCLE9BQU9KLGFBQWFLLE9BQU8sQ0FBQztBQUM5QixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY29tcGFueS1wb3J0Zm9saW8tZnJvbnRlbmQvLi9zcmMvdXRpbHMvYXV0aC50cz9mZDI5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7and0RGVjb2RlfSBmcm9tICdqd3QtZGVjb2RlJztcclxuXHJcbmV4cG9ydCBjb25zdCBpc1Rva2VuVmFsaWQgPSAodG9rZW46IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBkZWNvZGVkOiBhbnkgPSBqd3REZWNvZGUodG9rZW4pO1xyXG4gICAgcmV0dXJuIGRlY29kZWQuZXhwICogMTAwMCA+IERhdGUubm93KCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFRva2VuRGF0YSA9ICh0b2tlbjogc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBqd3REZWNvZGUodG9rZW4pO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZVRva2VuID0gKCkgPT4ge1xyXG4gIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNldFRva2VuID0gKHRva2VuOiBzdHJpbmcpID0+IHtcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0b2tlbik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VG9rZW4gPSAoKTogc3RyaW5nIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xyXG59O1xyXG4iXSwibmFtZXMiOlsiand0RGVjb2RlIiwiaXNUb2tlblZhbGlkIiwidG9rZW4iLCJkZWNvZGVkIiwiZXhwIiwiRGF0ZSIsIm5vdyIsImdldFRva2VuRGF0YSIsInJlbW92ZVRva2VuIiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsInNldFRva2VuIiwic2V0SXRlbSIsImdldFRva2VuIiwiZ2V0SXRlbSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/utils/auth.ts\n");

/***/ }),

/***/ "./src/styles/animations.css":
/*!***********************************!*\
  !*** ./src/styles/animations.css ***!
  \***********************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/theme.css":
/*!******************************!*\
  !*** ./src/styles/theme.css ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "jwt-decode":
/*!*****************************!*\
  !*** external "jwt-decode" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = import("jwt-decode");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();