const form = document.getElementById('form');


function getIdValue(id) {
    return Number(document.getElementById(id).value);
}

function getIndexValue(id) {
    const select = document.getElementById(id);
    return select.options[select.selectedIndex].value;
}

form.addEventListener('submit', calcular);

function calcular(event) {
    event.preventDefault();

    const gender = getIndexValue('gender');
    const age = getIdValue('age');
    const weight = getIdValue('weight');
    const height = getIdValue('height');
    const activityLevel = getIndexValue('activityLevel');
    const goal = getIndexValue('goal');
    console.log(goal)

    const tmb = Math.round(
    gender === 'female' 
    ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age))
    : (66 + (13.7 * weight) + (5 * height) - (6.8 * age))
    );

    const maintenence = Math.round(tmb*Number(activityLevel));
    const loseWeight = maintenence - 500;
    const gainWeight = maintenence + 500;

    const loseWeightText = `
    <div class="field-content">
        <h2>Aqui está o resultado:</h2>
        <ul>
            <li>
            Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
            </li>
            <li>
            Para manter o seu peso você precisa consumir em média <strong>${maintenence} calorias</strong>.
            </li>
            <li>
            Para perder gordura você precisa consumir em média <strong>${loseWeight} calorias</strong>.
            </li>
        </ul>
    </div> `;

    const gainWeightText = `<div class="field-content">
    <h2>Aqui está seu resultado:</h2>
    <ul>
        <li>
        Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
        </li>
        <li>
         Para manter o seu peso você precisa consumir em média <strong>${maintenence} calorias</strong>.
        </li>
        <li>
        Para ganhar massa você precisa consumir em média <strong>${gainWeight} calorias</strong>.
        </li>
    </ul>
    </div>`;

    const layout = goal === 'loseWeight' ? loseWeightText : gainWeightText;


    const protein = Math.round(weight*2);
    console.log(protein);
    const fat = Math.round(goal === 'loseWeight' ? (0.6*weight) : (weight));
    console.log(fat)
    const carbohydrate = 
    Math.round(goal === 'loseWeight' ? ((loseWeight - (protein*4 + fat*9)) /4 )
    : ((gainWeight - (protein*4 + fat*9)) /4 ));
    console.log(carbohydrate);
    const fibre = Math.round(goal === 'loseWeight' ? (loseWeight/100) : (gainWeight/100));
    console.log(fibre);


    const macrosText = `
        <h2>Sua quantidade em média diária de:</h2>
        <div class="macro-grid">
            <li>
            <img src="src/assets/carne.svg" alt="Proteínas">
            <span>Proteínas: </br><strong>${protein} g</strong></span>
            </li>
            <li>
            <img src="src/assets/carboidratos.svg" alt="Carboidratos">
            <span>Carboidratos: </br><strong>${carbohydrate} g</strong></span>
            </li>
            <li>
            <img src="src/assets/abacate.svg" alt="Gorduras boas">
            <span>Gorduras boas: </br><strong>${fat} g</strong></span>
            </li>
            <li>
            <img src="src/assets/vegetal.svg" alt="Fibras">
            <span>Fibras: </br><strong>${fibre} g</strong></span>
            </li>
        </div>
    `;

    const resultMacro = document.getElementById('macros');
    resultMacro.innerHTML = macrosText;

    


    const result = document.getElementById('result');
    result.innerHTML = layout;
    
}

