let allapot = JSON.parse(localStorage.getItem('csokiAllapot')) || {
    csokik:[
        {
            nev: "Étcsoki",
            ara: 2500,
            raktaron: true
        },
        {
            nev: "Fehér csoki",
            ara: 3500,
            raktaron: false
        },
        {
            nev: "Lyukas csoki",
            ara: 1500,
            raktaron: true
        }

    ]
};

function mentesLocalStoragebe(){
    localStorage.setItem('csokiAllapot', JSON.stringify(allapot));
};

// Termékek aktualizálása, kiolvasása

function renderCsokik(){
    let csokik = "";
    allapot.csokik.forEach((csoki, index) => {
        console.log(index);
        csokik += `<div class="${csoki.raktaron ? "bg-success" : "bg-danger"} m-4 p-4 text-center text-white">
            <p>${csoki.nev}</p>
            <p>${csoki.ara} Ft</p>
            <button class="btn btn-danger" onclick="torles(${index})">Törlés
            </button>
            <button class="btn btn-success" onclick="modositas(${index})">Módosítás
            </button>
        </div>`
    });
        
        
    
    document.getElementById("csoki-lista").innerHTML = csokik;

    
}

document.getElementById("ujtermek").onclick = () =>{
    let newFormHTML = `
    <h4>Új csoki hozzáadása</h4>
    <form id="uj-csoki" class="p-5">
        <label class="w-100">
            <h5>Termék neve:</h5>
            <input type="text" name="nev" class="form-control">
        </label>

        <label class="w-100">
            <h5>Termék ára:</h5>
            <input type="number" name="ara" class="form-control">
        </label>

        <label class="w-100">
            <h5>Van-e raktáron?</h5>
            <input type="checkbox" name="raktaron" class="form-control">
        </label>

        <button class="btn btn-primary" type="submit">Felvitel</button>

    </form>
    `;
    document.getElementById("uj").innerHTML = newFormHTML;
    document.getElementById("uj-csoki").onsubmit = function(event){
        event.preventDefault();
        let nev = event.target.elements.nev.value
        console.log(nev)
        let ara = event.target.elements.ara.value
        console.log(ara)
        let raktaron = event.target.elements.raktaron.checked
        console.log(raktaron)
    

        allapot.csokik.push(
            {
                nev: nev,
                ara: ara,
                raktaron: raktaron
            }

        )
        document.getElementById('uj').innerHTML = "";
        document.getElementById('ujtermek').style.display = 'block';
        mentesLocalStoragebe();
        renderCsokik();
    }
}

function torles(index){
    allapot.csokik.splice(index, 1);
    renderCsokik();
};

function modositas(index){
    let csoki = allapot.csokik[index];
    let modositasFormHTML = `<h4>Módosítás</h4>
    <form id="modositas-csoki" class="p-5">
        <label class="w-100">
            <h5>Termék neve:</h5>
            <input type="text" name="nev" class="form-control" value="${csoki.nev}">
        </label>

        <label class="w-100">
            <h5>Termék ára:</h5>
            <input type="number" name="ara" class="form-control" value="${csoki.ara}">
        </label>

        <label class="w-100">
            <h5>Van-e raktáron?</h5>
            <input type="checkbox" name="raktaron" class="form-control" ${csoki.raktaron ? 'checked' : ''}>
        </label>

        <button class="btn btn-primary" type="submit">Felvitel</button>

    </form>
    `;
    document.getElementById("uj").innerHTML = modositasFormHTML;
    document.getElementById("modositas-csoki").onsubmit = function(event){
        event.preventDefault();
        let nev = event.target.elements.nev.value;
        console.log(nev);
        let ara = event.target.elements.ara.value;
        console.log(ara);
        let raktaron = event.target.elements.raktaron.checked;
        console.log(raktaron);
        allapot.csokik[index] = {
                nev: nev,
                ara: ara,
                raktaron: raktaron
            }

        
        document.getElementById('uj').innerHTML = "";
        document.getElementById('ujtermek').style.display = 'block';
        mentesLocalStoragebe();
        renderCsokik();
    };
};

window.onload = renderCsokik();

