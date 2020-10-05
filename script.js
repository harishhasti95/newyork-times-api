async function createCards(item){
    return new Promise(async function(resolve,reject){
        var api = 'oWEfQlSzPeRlmSIXM406C6QKLSk3Qzyr';

        try{
            var url = `https://api.nytimes.com/svc/topstories/v2/${item}.json?api-key=${api}`;

            var data = await fetch(url);
            var json_final = await data.json();
            resolve(json_final);

        }
        catch(err){
            reject(err);
        }
    })
}
var div = document.createElement('div');
div.setAttribute('id','main');
div.classList.add(['container']);

createCards('home')
.then(function(data){
    
    var data_json_arr = data.results;
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

})


document.body.appendChild(div);