const pdfreader = require("pdfreader");
const ignorar = 8;

function get(file) {
    return Extraer(file);
}

const Extraer = (file) => {
    let cont = 0
    let controlCampos = false
    let response = []
    let row = {}

    const nuevo = `./uploads/${file}`

    return new Promise((resolve, reject) => {
        new pdfreader.PdfReader().parseFileItems(nuevo, function (err, item) {
            if (err) console.log(err);
            else if (!item) {
                console.log('sin registros')
                resolve(response)
            } else if (item.text) {
                cont = cont + 1;
                if (cont > ignorar && !controlCampos) {
                    cont = 1;
                    controlCampos = true;
                }

                if (cont == 1 && controlCampos) {
                    row = { 'Ejemplar': item.text }
                }

                if (cont == 2 && controlCampos) {
                    row = { ...row, 'Parciales': item.text }
                }



                if (cont == 3 && controlCampos) {

                    console.log('RM', item.text.length)
                    if (item.text.length > 12) { // RM no debe ser mayor a 12 caracteres, en ocaciones llega aca parciales
                        console.log('data incosistente en parciales', item.text)
                        cont = 2
                    }
                    // No habia RM " " y toma Jockey
                    else if (item.text.length > 6) {
                        //cont = 2
                        row = { ...row, 'RM': '--' }
                        row = { ...row, 'Jockey': item.text }
                        cont = 4;
                    }
                    // Deber ser correcto RM
                    else {
                        row = { ...row, 'RM': item.text }
                    }
                }
                if (cont == 4 && controlCampos) {
                    row = { ...row, 'Jockey': item.text }
                }
                if (cont == 5 && controlCampos) {
                    row = { ...row, 'Trainner': item.text }
                    cont = 0

                    response.push(row)
                }
            };
        });

    });
};

module.exports = {
    Extraer, get
}
