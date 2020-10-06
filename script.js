var topics = ['home', 'world', 'politics', 'magazine', 'technology', 'science', 'health', 'sports', 'arts', 'fashion', 'food', 'travel'];
function createClass(element, className) {
    var k = document.createElement(element);
    k.setAttribute('class', className);
    return k;
}

function setAttributesInEle(element, attr) {
    for (var j in attr) {
        element.setAttribute(j, attr[j]);
    }
}
var container = createClass('div', 'container');
var navigation = createClass('nav', 'navbar navbar-expand-lg navbar-dark bg-dark');
var button = createClass('button', 'navbar-toggler');
setAttributesInEle(button, {
    'type': 'button',
    'data-toggle': 'collapse',
    'data-target': '#navbarCollapse'
});
var span = createClass('span', 'navbar-toggler-icon');
var collapse = createClass('div', 'collapse navbar-collapse');
setAttributesInEle(collapse, { 'id': 'navbarCollapse' });
var navbar = createClass('div', 'navbar-nav');
var a = [];

for (var i = 0; i < 12; i++) {
    a[i] = document.createElement('a');
    setAttributesInEle(a[i], {
        'href': '#',
        'class': "nav-item nav-link",
        'id': topics[i],
        'onclick': `createCards('${topics[i]}')`,
    });
    a[i].innerHTML = topics[i].toUpperCase();
    navbar.append(a[i]);
}


collapse.appendChild(navbar);
button.appendChild(span);
navigation.append(button, collapse);
container.appendChild(nav);
document.body.append(container);

var div = document.createElement('div');
div.setAttribute('id','main');
div.classList.add(['container']);
var j = 0;
async function createCards(item){
    var api = 'oWEfQlSzPeRlmSIXM406C6QKLSk3Qzyr';

    try{
        
        document.getElementById('main').innerHTML = '';
        var url = `https://api.nytimes.com/svc/topstories/v2/${item}.json?api-key=${api}`;

        var data = await fetch(url);
        var json_final = await data.json();
        var data_json_arr = json_final.results;
        console.log(data_json_arr);

        for(var i=0;i<data_json_arr.length;i++){
            var card = document.createElement('div');
            card.classList.add(['card','mt-3','mb-3']);
            card.setAttribute('id',data_json_arr[i].section);
            
            var card_body = document.createElement('div');
            card_body.setAttribute('class','row');
            card_body.style.margin = '5px'
            card_body.style.padding = '5px'
            card_body.style.border = '1px solid black'

            var card_left = document.createElement('div');
            card_left.setAttribute('class','col-md-9');

            var card_left_sec = document.createElement('h4');
            card_left_sec.innerHTML = data_json_arr[i].section;

            var card_left_day = document.createElement('div');
            card_left_day.innerHTML = 'Published date: ' + data_json_arr[i].created_date.split('T')[0];

            var card_left_title = document.createElement('div');
            card_left_title.innerHTML = `<b>${data_json_arr[i].title}</b>`;

            var card_left_abstract = document.createElement('div');
            card_left_abstract.innerHTML = data_json_arr[i].abstract;

            var card_left_con = document.createElement('a');
            card_left_con.setAttribute('href', data_json_arr[i].url);
            card_left_con.setAttribute('target','_blank');
            card_left_con.innerHTML = 'Continue Reading the full article ... '

            var card_right = document.createElement('div');
            card_right.setAttribute('class','col-md-3');
            card_right.style.textAlign = 'center'

            card_right_img = document.createElement('img');
            card_right_img.classList.add(['img-thumbnail']);
            card_right_img.setAttribute('src', data_json_arr[i].multimedia[2].url);

            card_left.appendChild(card_left_sec);
            
            card_left.appendChild(card_left_title);
            card_left.appendChild(card_left_abstract);
            
            card_left.appendChild(card_left_day);
            card_left.appendChild(card_left_con);
            card_right.appendChild(card_right_img);

            card_body.appendChild(card_left);
            card_body.appendChild(card_right);
            card.appendChild(card_body);
            document.getElementById('main').append(card);
            document.getElementById('main').append(document.createElement('br'));
        }
    }
    catch(err){
        console.log(err);
    }
};
document.body.appendChild(div);
