var data = [{
    tagName: 'div',
    className: 'test-class',
    styles: {
        width: "100px",
        height: "100px",
        backgroundColor: 'red'
    },
    children: [{
            tagName: 'div',
            className: 'box',
            styles: {
                width: "50px",
                height: "50px",
                backgroundColor: 'blue'
            },
        },
        {
            tagName: 'div',
            className: 'box',
            styles: {
                width: "50px",
                height: "50px",
                backgroundColor: 'brown',
                float: 'right'
            },
        },
        {
            tagName: 'div',
            className: 'box',
            styles: {
                width: "30px",
                height: "30px",
                backgroundColor: 'aqua',
                float: 'right'
            },
        }
    ]
}];


var body = document.getElementsByTagName('body')[0];
var arrLen = data.length;
var objLen = Object.keys(data[0]).length;

for (var i = 0; i < arrLen; i++) {
    JsontoHTML(data[i]);
}

function JsontoHTML(keys) {
    var parent = convertIndividualJSONtoHtml(keys);
    // console.log(parent);
    for (var i = 0; i < keys.children.length; i++) {
        parent.appendChild(convertIndividualJSONtoHtml(keys.children[i]));
    }
    body.appendChild(parent);

}

function convertIndividualJSONtoHtml(keys) {
    var element = document.createElement(keys.tagName);
    element.setAttribute('class', keys.className);
    for (style in keys.styles) {
        element.style[style] = keys.styles[style];
    }
    return element;
    // console.log(element);
}