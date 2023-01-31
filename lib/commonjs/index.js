"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  TabView: true,
  TabFlatList: true,
  TabScrollView: true,
  TabSectionList: true,
  useHeaderTabContext: true
};
Object.defineProperty(exports, "TabFlatList", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabFlatList;
  }
});
Object.defineProperty(exports, "TabScrollView", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabScrollView;
  }
});
Object.defineProperty(exports, "TabSectionList", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabSectionList;
  }
});
exports.TabView = void 0;
Object.defineProperty(exports, "useHeaderTabContext", {
  enumerable: true,
  get: function () {
    return _context.useHeaderTabContext;
  }
});
var _reactNativeTabView = require("react-native-tab-view");
var _createCollapsibleTabs = require("./create-collapsible-tabs");
Object.keys(_createCollapsibleTabs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _createCollapsibleTabs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createCollapsibleTabs[key];
    }
  });
});
var _scrollableView = require("./scrollable-view");
var _scene = require("./scene");
Object.keys(_scene).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _scene[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scene[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
var _context = require("./context");
const TabView = (0, _createCollapsibleTabs.createCollapsibleTabsComponent)(_reactNativeTabView.TabView);
exports.TabView = TabView;
//# sourceMappingURL=index.js.map