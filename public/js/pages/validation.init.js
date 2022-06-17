/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/pages/validation.init.js":
/*!***********************************************!*\
  !*** ./resources/js/pages/validation.init.js ***!
  \***********************************************/
/***/ (() => {

eval("/*\r\nTemplate Name: Vhato - Responsive Bootstrap 5 Chat App\r\nAuthor: Themesbrand\r\nWebsite: https://Themesbrand.com/\r\nContact: Themesbrand@gmail.com\r\nFile: validation Js File\r\n*/\n// Example starter JavaScript for disabling form submissions if there are invalid fields\nvar validateFields = function validateFields() {\n  // Fetch all the forms we want to apply custom Bootstrap validation styles to\n  var forms = document.getElementsByClassName(\"needs-validation\"); // Loop over them and prevent submission\n\n  var validation = Array.prototype.filter.call(forms, function (form) {\n    form.addEventListener(\"submit\", function (event) {\n      if (form.checkValidity() === false) {\n        event.preventDefault();\n        event.stopPropagation();\n      }\n\n      form.classList.add(\"was-validated\");\n    }, false);\n  });\n};\n\n(function () {\n  \"use strict\";\n\n  window.addEventListener(\"load\", validateFields, false);\n})();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvcGFnZXMvdmFsaWRhdGlvbi5pbml0LmpzLmpzIiwibmFtZXMiOlsidmFsaWRhdGVGaWVsZHMiLCJmb3JtcyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInZhbGlkYXRpb24iLCJBcnJheSIsInByb3RvdHlwZSIsImZpbHRlciIsImNhbGwiLCJmb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiY2hlY2tWYWxpZGl0eSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwid2luZG93Il0sInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvcGFnZXMvdmFsaWRhdGlvbi5pbml0LmpzPzM3YjQiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuVGVtcGxhdGUgTmFtZTogVmhhdG8gLSBSZXNwb25zaXZlIEJvb3RzdHJhcCA1IENoYXQgQXBwXHJcbkF1dGhvcjogVGhlbWVzYnJhbmRcclxuV2Vic2l0ZTogaHR0cHM6Ly9UaGVtZXNicmFuZC5jb20vXHJcbkNvbnRhY3Q6IFRoZW1lc2JyYW5kQGdtYWlsLmNvbVxyXG5GaWxlOiB2YWxpZGF0aW9uIEpzIEZpbGVcclxuKi9cclxuXHJcbi8vIEV4YW1wbGUgc3RhcnRlciBKYXZhU2NyaXB0IGZvciBkaXNhYmxpbmcgZm9ybSBzdWJtaXNzaW9ucyBpZiB0aGVyZSBhcmUgaW52YWxpZCBmaWVsZHNcclxuY29uc3QgdmFsaWRhdGVGaWVsZHMgPSAoKSA9PiB7XHJcbiAgICAvLyBGZXRjaCBhbGwgdGhlIGZvcm1zIHdlIHdhbnQgdG8gYXBwbHkgY3VzdG9tIEJvb3RzdHJhcCB2YWxpZGF0aW9uIHN0eWxlcyB0b1xyXG4gICAgdmFyIGZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm5lZWRzLXZhbGlkYXRpb25cIik7XHJcbiAgICAvLyBMb29wIG92ZXIgdGhlbSBhbmQgcHJldmVudCBzdWJtaXNzaW9uXHJcbiAgICB2YXIgdmFsaWRhdGlvbiA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChmb3JtcywgZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgICAgICAgIFwic3VibWl0XCIsXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJ3YXMtdmFsaWRhdGVkXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcbiAgICB9KTtcclxufTtcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHZhbGlkYXRlRmllbGRzLCBmYWxzZSk7XHJcbn0pKCk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLElBQU1BLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsR0FBTTtFQUN6QjtFQUNBLElBQUlDLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxrQkFBaEMsQ0FBWixDQUZ5QixDQUd6Qjs7RUFDQSxJQUFJQyxVQUFVLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkMsTUFBaEIsQ0FBdUJDLElBQXZCLENBQTRCUCxLQUE1QixFQUFtQyxVQUFVUSxJQUFWLEVBQWdCO0lBQ2hFQSxJQUFJLENBQUNDLGdCQUFMLENBQ0ksUUFESixFQUVJLFVBQVVDLEtBQVYsRUFBaUI7TUFDYixJQUFJRixJQUFJLENBQUNHLGFBQUwsT0FBeUIsS0FBN0IsRUFBb0M7UUFDaENELEtBQUssQ0FBQ0UsY0FBTjtRQUNBRixLQUFLLENBQUNHLGVBQU47TUFDSDs7TUFDREwsSUFBSSxDQUFDTSxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsZUFBbkI7SUFDSCxDQVJMLEVBU0ksS0FUSjtFQVdILENBWmdCLENBQWpCO0FBYUgsQ0FqQkQ7O0FBa0JBLENBQUMsWUFBWTtFQUNUOztFQUNBQyxNQUFNLENBQUNQLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDVixjQUFoQyxFQUFnRCxLQUFoRDtBQUNILENBSEQifQ==\n//# sourceURL=webpack-internal:///./resources/js/pages/validation.init.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./resources/js/pages/validation.init.js"]();
/******/ 	
/******/ })()
;