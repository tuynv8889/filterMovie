"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 785:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

;// CONCATENATED MODULE: external "react/jsx-runtime"
const jsx_runtime_namespaceObject = require("react/jsx-runtime");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "moment"
const external_moment_namespaceObject = require("moment");
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_namespaceObject);
;// CONCATENATED MODULE: ./pages/_app.tsx



const timeFormat = "HH:mm:ss";
const movies = [
    {
        name: "Moonlight",
        rating: 98,
        genres: [
            "Drama"
        ],
        showings: [
            "18:30:00+11:00",
            "20:30:00+11:00"
        ]
    },
    {
        name: "Zootopia",
        rating: 92,
        genres: [
            "Action & Adventure",
            "Animation",
            "Comedy"
        ],
        showings: [
            "19:00:00+11:00",
            "21:00:00+11:00"
        ]
    },
    {
        name: "The Martian",
        rating: 92,
        genres: [
            "Science Fiction & Fantasy"
        ],
        showings: [
            "17:30:00+11:00",
            "19:30:00+11:00"
        ]
    },
    {
        name: "Shaun The Sheep",
        rating: 80,
        genres: [
            "Animation",
            "Comedy"
        ],
        showings: [
            "19:00:00+11:00"
        ]
    }, 
];
const Home = ()=>{
    const { 0: gern , 1: setGern  } = (0,external_react_.useState)("");
    const { 0: time , 1: setTime  } = (0,external_react_.useState)("");
    const { 0: movieItems , 1: setMovieItems  } = (0,external_react_.useState)([]);
    const getRecommends = (0,external_react_.useCallback)(async ()=>{
        const moviesByGern = movies// add vitural field keyword, times for query purpose
        .map((item)=>{
            return {
                ...item,
                keyword: gern,
                times: item.showings.map((t)=>external_moment_default()(t, timeFormat))
            };
        })// filter by gern
        .filter((item)=>item.genres.find((i)=>i.toLowerCase().includes(gern.toLowerCase())))// filter by time: the input + 30min is equal or before the time showing
        .filter((i)=>{
            if (time && external_moment_default()(`${time}:00`, timeFormat).isValid()) {
                const inTime = external_moment_default()(`${time}:00`, timeFormat);
                const before30Min = inTime.add(+30, "minutes");
                return i.showings.find((t)=>{
                    const before30m = external_moment_default()(t, timeFormat).isSameOrAfter(before30Min);
                    return before30m;
                });
            }
            return i;
        }).sort((a, b)=>a.keyword.localeCompare(b.keyword) || b.rating - a.rating);
        setMovieItems(moviesByGern);
    }, [
        time,
        gern
    ]);
    (0,external_react_.useEffect)(()=>{
        if (!time && !gern) {
            setMovieItems(movies);
        }
    }, [
        time,
        gern
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("input", {
                        placeholder: "Enter you genres",
                        type: "text",
                        onChange: (e)=>setGern(e.target.value)
                    }),
                    /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("input", {
                        placeholder: "Time: hour:min",
                        type: "text",
                        onChange: (e)=>setTime(e.target.value)
                    }),
                    /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("button", {
                        onClick: ()=>getRecommends(),
                        children: "search"
                    })
                ]
            }),
            movieItems.length > 0 ? /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("div", {
                children: movieItems.map((item, ind)=>{
                    return /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)(jsx_runtime_namespaceObject.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("ul", {
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("li", {
                                        children: [
                                            "Name: ",
                                            item.name
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("li", {
                                        children: [
                                            "Rating: ",
                                            item.rating
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("li", {
                                        children: [
                                            "Genres: ",
                                            item.genres.join(", ")
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_namespaceObject.jsxs)("li", {
                                        children: [
                                            "Showings: ",
                                            item.showings.join(", ")
                                        ]
                                    })
                                ]
                            }, `item-${ind}`),
                            ind < movieItems.length - 1 && /*#__PURE__*/ jsx_runtime_namespaceObject.jsx("hr", {})
                        ]
                    });
                })
            }) : "no	movie	recommendations"
        ]
    });
};
/* harmony default export */ const _app = (Home);


/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(785));
module.exports = __webpack_exports__;

})();