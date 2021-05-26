
const Briseo = require('./../briseo/models/briseos')
const { response } = require('express');

const path = require('path')

const Extraer = require('./../../../utils/extract-data-from-file/extract-data');

const createBriseo = async (req, res) => {
    const body = req.body
    let briseo = new Briseo(body)
    briseo.save((err, briseoDB) => {
        if (err) {
            return res.status(400).json({
                err
            });

        } else {
            res.status(201).json({
                msg: 'Briseo registrado',
                user: briseoDB,
            });
        }
    })
}

const uploadFileBriseo = async (req, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json('Debe cargar al menos 1 archivo.');
    }
    const { DateBriseo } =  req.body;


    const validateUniqueDateBriseo = await Briseo.findOne({ DateBriseo });

    if (validateUniqueDateBriseo) {
        return res.status(400).json({
            error: `La fecha ${DateBriseo} ya existe`
        });
    }

    const archivo = req.files.briseo
    let uploadPath = path.join(__dirname, '../../../uploads/', archivo.name);

    const extension = archivo.name.split('.')[1];
    if (extension !== 'pdf') {
        return res.status(400).send('Extension no valida, solo pdf.');
    }

  await  archivo.mv(uploadPath, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ err });
        }

        const data = Extraer.get(archivo.name);

        data.then((briseos) => {
            briseos.forEach(element => {
                element.DateBriseo = DateBriseo
                let briseo = new Briseo(element)
                briseo.save((err) => {
                    if (err) {
                      console.log(err);
                      return res.status(400).json({
                        err
                    });
                    } 
                })
            });

            res.json({
                'estatus': 200,
                'msg': 'Archivo movido y procesado ', uploadPath
            });
        })
    });

}

const getBriseo =  async ( req, res) =>{
     const { DateBriseo } = req.query;
     let filterEjemplar={}, filterDateBriseo={};

        if (DateBriseo) {
            filterDateBriseo = { 'DateBriseo': DateBriseo };
        }
   
    const briseos = await Briseo.find({ $and: [filterEjemplar, filterDateBriseo] }).sort()
    res.json({
        Total: briseos.length,
        briseos
    })
}

module.exports = {
    createBriseo, uploadFileBriseo,getBriseo
}