new Vue({
    el: "#app",
    vuetify: new Vuetify(),

    data: {
        filtros: [
            {
                state: false,
                campo: "",
                filtro: "Contêm",
                texto: ""
            },
            {
                state: false,
                campo: "",
                filtro: "Contêm",
                texto: ""
            },
            {
                state: false,
                campo: "",
                filtro: "Contêm",
                texto: ""
            },
            {
                state: false,
                campo: "",
                filtro: "Contêm",
                texto: ""
            },

        ],

        items: [
        ],

        Tiposfiltro: [
            { state: 'Contêm' },
            { state: 'Igual a' },
            { state: 'Diferente de' },
            { state: 'Começa com' },
            { state: 'Termina com' },
        ],

        lista_items: [],
        current_list: [],
        search: "",
        statusCarregando: false,
        errored: false,
        dialog: false,
        dispStatPanel: false,
        filtro0: '', filtro1: '', filtro2: '', filtro3: '',
        filtrotipo0: "Contêm", filtrotipo1: "Contêm", filtrotipo2: "Contêm", filtrotipo3: "Contêm",
        filtrocampo0: '', filtrocampo1: '', filtrocampo2: '', filtrocampo3: '',
        minusbttn0: '', minusbttn1: '', minusbttn2: '', minusbttn3: '',
        headers: [],
        xx: '',
        nofilters: true, isSelecting: false,
        selectedFile: null

    },
    // <!------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>

    watch: {

        filtro0: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtro1: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtro2: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtro3: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },

        filtrotipo0: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtrotipo1: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtrotipo2: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtrotipo3: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },

        filtrocampo0: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtrocampo1: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtrocampo2: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        filtrocampo3: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },

        minusbttn0: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        minusbttn1: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        minusbttn2: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
        minusbttn3: function () {
            return changed_filter(this.filtros, this.current_list, this.headers)
        },
    },

    // <!------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>

    computed: {



    },
    // <!------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>

    methods: {
        handleFileImport() {
            var roa
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true });

            // Trigger click on the FileInput
            this.$refs.uploader.click();
        },
        onFileChanged(e) {

            this.selectedFile = e.target.files[0];
            // Do whatever you need with the file, liek reading it with FileReader


            this.lista_items = []
            this.statusCarregando = true
            var roa
            var result = {};
            if (this.selectedFile.length == 0) {
                console.log("Please choose any file...");
                return;
            }
            var filename = this.selectedFile.name;
            var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
            if (extension == '.XLS' || extension == '.XLSX') {

                try {

                    var reader = new FileReader();
                    reader.readAsBinaryString(this.selectedFile);

                    reader.onload = ((e) => {
                        //console.log(e)
                        var data = e.target.result;
                        var workbook = XLSX.read(data, {
                            type: 'binary'
                        });

                        //result = {};
                        workbook.SheetNames.forEach(sheetName => {
                            roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], { range: 1 })
                            result = roa



                            var teste = []
                            for (var i = 0; i < roa.length; i++) {
                                tess = roa[i]
                                const newObj = Object.fromEntries(
                                    Object.entries(tess).map(([k, v]) => [replaceAll(k, ' ', '_').toLowerCase(), v])
                                );
                                teste.push(newObj)

                            }
                            var tmp = Object.keys(roa[0]);
                            roa.forEach(element => {
                                if (!(_.isEqual(tmp, Object.keys(element)))) {



                                    array3 = Object.keys(element).filter(function (obj) { return tmp.indexOf(obj) == -1; })
                                    console.log(array3)
                                    array3.forEach(element2 => {
                                        tmp.push(element2)

                                    });

                                }
                            });
                            this.lista_items = teste
                            console.log(teste)
                            this.current_list = teste;
                            this.headers = headerss(tmp)
                            this.items = update_options(tmp)
                            this.statusCarregando = false;
                            this.current_list = teste

                        });
                    })
                }
                catch (e) {
                    console.error(e.target.result);
                }
            }
            else {
                console.log("Please select a valid excel file.");
                return
            }

        },


        mostra1() {

            console.log(this.current_list)
            console.log(this.headers)
            this.filtros[0].state = true

            this.nofilters = false
        },

        aaa() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark

        },

        addfilter() {
            var i = 0
            for (i = 1; i < this.filtros.length; i++) {
                if (this.filtros[i].state == false) {
                    this.filtros[i].state = true
                    break;
                }
            }
            flag = 0
            this.filtros.forEach(element => {
                if (element.state == false) {
                    flag++
                }
            });

            if (flag == this.filtros.length) {
                this.nofilters = true
            }
            else {
                this.nofilters = false
            }
        },
        removefilter(n) {
            var tmpstr
            if (this.filtros[n].state == true) {
                this.filtros[n].state = false
                this.filtros[n].campo = ''
                this.filtros[n].texto = ''
                tmpstr = 'filtrocampo' + String(n)
                this[tmpstr] = ''
                tmpstr = 'filtro' + String(n)
                this[tmpstr] = ''
                changed_filter(this.filtros, this.current_list, this.headers)
            }
            flag = 0
            this.filtros.forEach(element => {
                if (element.state == false) {
                    flag++
                }
            });

            if (flag == this.filtros.length) {
                this.nofilters = true
            }
            else {
                this.nofilters = false
            }
        },
        clearfilters() {
            this.filtros.forEach((element, index) => {
                var tmpstr
                if (this.filtros[index].state == true) {
                    this.filtros[index].state = false
                    this.filtros[index].campo = ''
                    this.filtros[index].texto = ''
                    tmpstr = 'filtrocampo' + String(index)
                    this[tmpstr] = ''
                    tmpstr = 'filtro' + String(index)
                    this[tmpstr] = ''
                    changed_filter(this.filtros, this.current_list, this.headers)
                }
            });
            this.nofilters = true
        },

        changed_campo_filtro0(value) {
            this.filtros[0].campo = value.state;
            // this.current_list = update_table(this.current_list, this.filtros);
        },

        changed_campo_filtro1(value) {
            this.filtros[1].campo = value.state;
            //  this.current_list = update_table(this.current_list, this.filtros);
        },

        changed_campo_filtro2(value) {
            this.filtros[2].campo = value.state;
            // this.current_list = update_table(this.current_list, this.filtros);
        },

        changed_campo_filtro3(value) {
            this.filtros[3].campo = value.state;
            // this.current_list = update_table(this.current_list, this.filtros);
        },


        changed_tipo_filtro_filtro0(value) {
            this.filtros[0].filtro = value.state;
            // this.current_list = update_table(this.current_list, this.filtros);
        },
        changed_tipo_filtro_filtro1(value) {
            this.filtros[1].filtro = value.state;
            // this.current_list = update_table(this.current_list, this.filtros);
        },
        changed_tipo_filtro_filtro2(value) {
            this.filtros[2].filtro = value.state;
            //   this.current_list = update_table(this.current_list, this.filtros);
        },
        changed_tipo_filtro_filtro3(value) {
            this.filtros[3].filtro = value.state;
            // this.current_list = update_table(this.current_list, this.filtros);
        },

        changed_text_filtro0(value) {
            this.filtros[0].texto = value;
            // this.current_list = update_table(this.current_list, this.filtros);
        },

        changed_text_filtro1(value) {
            this.filtros[1].texto = value;
            //  this.current_list = update_table(this.current_list, this.filtros);
        },

        changed_text_filtro2(value) {
            this.filtros[2].texto = value;
            //  this.current_list = update_table(this.current_list, this.filtros);
        },

        changed_text_filtro3(value) {
            this.filtros[3].texto = value;
            //  this.current_list = update_table(this.current_list, this.filtros);
        },




    },
})


function filtro(filtros, campo, value) {
    //console.log(campo)
    if (primeiro_filtro(filtros)) {
        return true
    }

    for (var i = 0; i < filtros.length; i++) {
        if (filtros[i].campo == campo) {
            if (filtros[i].texto == '') {

                return true
            }
            value = value.toUpperCase()
            splits = filtros[i].texto.split(';').filter(n => n)

            var flag = 0

            splits.forEach(element => {

                if (filtros[i].filtro == 'Contêm' && value.match(element.toUpperCase()) != null) {
                    flag++
                    return true
                }
                else if (filtros[i].filtro == 'Igual a' && element.toUpperCase() == value.toUpperCase()) {
                    flag++
                    return true
                }
                else if (filtros[i].filtro == 'Diferente de' && element.toUpperCase() != value.toUpperCase()) {
                    flag++
                    return true
                }
                else if (filtros[i].filtro == 'Começa com' && element.toUpperCase().startsWith(value.toUpperCase()) != 0) {
                    flag++
                    return true
                }
                else if (filtros[i].filtro == 'Termina com' && element.toUpperCase().endsWith(value.toUpperCase()) != 0) {
                    flag++
                    return true
                }
            });

            if (flag == 0) {
                return false
            }

        }
    }
    return true
}


function primeiro_filtro(filtros) {
    var flag = 0
    for (var i = 0; i < filtros.length; i++) {
        if (filtros[i].campo == '') {
            flag = flag + 1
        }
    }
    if (flag == filtros.length) {

        return true
    }
    else return false



}




function headerss(head) {

    var h = []
    var tmp = []
    var widthh = '150px'
    for (var i = 0; i < head.length; i++) {
        tmp = {
            'text': String(head[i]),
            'value': replaceAll(head[i], ' ', '_').toLowerCase(),
            width: widthh,
            filter: ''// function (value) {

            // if (typeof (this.headers) != "undefined")
            //   return filtro(this.filtros, this.headers[i].text, String(value))
            //  else
            //     return true
            // }
        }
        h.push(tmp)


    }
    //tmp = { text: 'Ações', value: 'actions', align: 'center', width: '150' },
    //    h.push(tmp)
    //  console.log(h)
    return h
}

function update_options(head) {

    var h = []
    var tmp = []


    for (var i = 0; i < head.length; i++) {
        tmp = { state: replaceAll(head[i], '_', ' ') }
        h.push(tmp)
    }
    //   console.log(h)
    return h

}

function changed_filter(filtros, current_list, headers) {
    var filtros_lcl = filtros
    if (typeof current_list != 'undefined') {
        if (typeof current_list[1] != 'undefined') {
            let ihuul = 2
            for (var jj = 0; jj < filtros_lcl.length; jj++) {
                let ihuul = jj
                if (filtros_lcl[jj].state == true) {
                    if (filtros_lcl[jj].campo != '') {
                        for (var ii = 0; ii < headers.length; ii++) {

                            if (headers[ii].text == filtros_lcl[jj].campo) {
                                //  console.log(filtros_lcl[ihuul].campo)
                                headers[ii].filter = function (value) {
                                    return filtro(filtros_lcl, filtros_lcl[ihuul].campo, String(value))
                                }
                            }

                        }
                    }
                }
            }
        }


    }


}
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}