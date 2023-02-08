var traverseDomAndCollectElements = function (
  matchFunc,
  startEl = document.body
) {
  var resultSet = [];

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl) === true) resultSet.push(startEl);
  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...result];
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === ".") return "class";
  if (selector[0] === "#") return "id";
  if (selector.includes(".")) return "tag.class";
  return "tag";
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (element) => selector === "#" + element.id;
    //
  } else if (selectorType === "class") {
    matchFunction = (element) => {
      for (const clase of element.classList) {
        if (selector === "." + clase) return true;
      }
      return false;
    };
    //
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      const [tag, clase] = selector.split(".");
      if (
        matchFunctionMaker(tag)(element) &&
        matchFunctionMaker("." + clase)(element)
      ) {
        return true;
      } else {
        return false;
      }
    };
    //
  } else if (selectorType === "tag") {
    matchFunction = (element) => selector === element.tagName.toLowerCase();
    //
  }
  return matchFunction;
};

const $ = function (selector) {
  let elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
