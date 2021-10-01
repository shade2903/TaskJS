//асинхронные запросы
 async function getCountries(){
     const resp = await fetch('https://date.nager.at/api/v3/AvailableCountries');
     const  contries = await resp.json(); 
     showCountries(contries);

 }
 getCountries();

 function showCountries(countries){
     for(let country of countries){
         const card = document.createElement('div');
         card.classList.add('card');
         card.addEventListener('click', ()=>{showHollidays(country.countryCode);
        });



         const img = document.createElement('img');
         img.src = `https://date.nager.at/images/circle-flags/flags/${country.countryCode}.svg`
        card.appendChild(img);

        const name = document.createElement('p');
        name.innerText = country.name;
        card.appendChild(name);
        document.body.appendChild(card);
        
     }
 }
 async function showHollidays(countryCode){    


const overLay = document.createElement('div');
overLay.classList.add('overLay');
document.body.appendChild(overLay);
overLay.addEventListener('click', ()=> overLay.remove());

const d = new Date();
const year = d.getFullYear();
const resp = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
const hollidays = await resp.json();
console.log(hollidays)

const dialog = document.createElement('div');
dialog.classList.add('dialog');
dialog.addEventListener('click', (event)=> event.stopPropagation());

for (let holliday of hollidays){
    const row = document.createElement('div');
    const date = document.createElement('span');
    date.classList.add('date');
    date.innerText = holliday.date;
    
    const name = document.createElement('span');
    name.innerText= `${holliday.name} (${holliday.localName})`;
    row.append(date,name);
    dialog.appendChild(row);

}
overLay.appendChild(dialog);



 }

//  const video = document.createElement('video');
//  video.controls = true ;
//  const source = document.createElement('source');
//  source.src = 'http://techslides.com/demos/sample-videos/small.mp4';
//  video.appendChild(source);
//  document.body.appendChild(video);
