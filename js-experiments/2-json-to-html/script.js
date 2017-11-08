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
        }
    ]
}];

var body = document.getElementsByTagName('body')[0];

var tagName = document.createElement(data[0].tagName);
body.appendChild(tagName);
tagName.className = data[0].className;
// var width=data[0].styles.width;
// tagName.style+width;
tagName.style.width = data[0].styles.width;
tagName.style.height = data[0].styles.height;
tagName.style.backgroundColor = data[0].styles.backgroundColor;

var tagNameChild0 = document.createElement(data[0].children[0].tagName);
tagNameChild0.className = data[0].children[0].className;
tagNameChild0.style.width = data[0].children[0].styles.width;
tagNameChild0.style.height = data[0].children[0].styles.height;
tagNameChild0.style.background = data[0].children[0].styles.backgroundColor;
tagName.appendChild(tagNameChild0);

var tagNameChild1 = document.createElement(data[0].children[1].tagName);
tagNameChild1.className = data[0].children[1].className;
tagNameChild1.style.width = data[0].children[1].styles.width;
tagNameChild1.style.height = data[0].children[1].styles.height;
tagNameChild1.style.background = data[0].children[1].styles.backgroundColor;
tagNameChild1.style.float = data[0].children[1].styles.float;
tagName.appendChild(tagNameChild1);
var stylesNum=Object.keys(data[0].styles).length;


// console.log(Object.keys(data[0]).length);
// tagName.style.