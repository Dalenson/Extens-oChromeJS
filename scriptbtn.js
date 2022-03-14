const button = document.getElementById('btn');
const btninfo = document.getElementById('btninfo');
const adiciona = document.getElementById('adiciona');
const token = document.getElementById('token');
const txttoken = document.getElementById('tt');
const cnpj = document.getElementById('cnpj');
const nome = document.getElementById('nome');
const cab = document.querySelector('h1');
const h4 = document.getElementById('h4');
const meuCabecalho = document.querySelector('h2');
const sec = document.getElementById('select');
const txtcab = document.getElementById('txtcab');
adiciona.addEventListener('click',adicionabt);
sec.addEventListener('change',selectoption);
button.addEventListener('click', updateButton);
btninfo.addEventListener('click', btn);

async function selectoption(){
    if(sec.value == 'contabilidade' || sec.value == 'convenios'){
        document.getElementById('div').innerHTML +='<style>#select{background-color: #17a2b8;} #top{border-color: #17a2b8;} #token{border-color: #17a2b8;}</style>'
    }
    if(sec.value == 'compras' || sec.value == 'almoxarifado' || sec.value == 'obras' || sec.value == 'patrimonio' || sec.value == 'contratos'){
        document.getElementById('div').innerHTML +='<style>#select{background-color: rgb(253, 143, 143);} #top{border-color:rgb(253, 143, 143);} #token{border-color: rgb(253, 143, 143);}</style>'
    }
}

async function adicionabt(){
    Swal.fire({
        title:"",
        html:'<div id="html"></div><input type="text" id="tkentidade" placeholder="Digite a Entidade" class="form-control">'+
        '<input type="text" id="tktoken" placeholder="Token da Entidade" class="form-control">'+
        '<button id="btadd" class="btn btn-outline-success">Adicionar</button>'+
        '<button id="btexx" class="btn btn-outline-danger">Excluir</button><style>#html{text-align:left} #tktoken{margin-bottom:10px}</style>',
             showCloseButton: false,
             showConfirmButton: false,
        customClass: {
            title: 'fs-6',
            text:'fs-6'
          },
    })
    for (var i=0; i<localStorage.length; i++){
        if(localStorage.key(i) != 'null'){
            document.getElementById('html').innerHTML+='<h1>'+localStorage.key(i)+' - '+localStorage.getItem(localStorage.key(i))+'</h1><style>h1{font-size:12px}</style>'
        }
    }
    const btadd = document.getElementById('btadd')
    btadd.addEventListener('click',btadiciona)

    const btexcluir = document.getElementById('btexx')
    btexcluir.addEventListener('click',btxc)
}

async function btadiciona(){
    localStorage.setItem("Entidade "+document.getElementById('tkentidade').value, document.getElementById('tktoken').value);
    Swal.close()
    adicionabt()
}

async function btxc(){
   for (var i=0; i<localStorage.length; i++){
    if(localStorage.key(i) != 'null'){
        localStorage.removeItem(localStorage.key(i))
    }
}
    Swal.close()
    adicionabt()
}

async function btn() {
    Swal.fire({
        title:"Informações:",
        html:'<img id="img" src="nyan-cat.gif" width="100%" height="160">'+
             '<h1><b>Autenticação do Token:</b> https://oauth.cloud.betha.com.br/auth/oauth2/tokeninfo?access_token=</h1><style>h1{font-size:10px}#swal2-html-container{margin:0; font-size:0}#img{margin-top:-50px;margin-bottom:-50px}</style><br>'+
             '<h1><b>Validação de Entidades:</b> Utilizado S.L de cada vertical</h1><br>'+
             '<h1><b>Validação da Base:</b> Utilizado função ATOB</h1><br><h1><b>Setor de Migração</b></h1>'+
             '<h1>https://gitlab.services.betha.cloud/dalencon/utilitario-migracao</h1>',
             showCloseButton: true,
             showConfirmButton: false,
        customClass: {
            title: 'fs-6',
            text:'fs-6'
          },
    })
}

async function updateButton() {
    h4.textContent = ''
    txtcab.textContent= ''

    chrome.tabs.getSelected(null, function (tab) {
        var tablink = tab.url;
        //alert(tablink.indexOf('entidades'))
        
        if (tablink.indexOf('entidades') > 0 && sec.value != '-- Sistema --') {
            if (sec.value == 'contabilidade') {
                //alert(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("entidades/") + 42))
                tablink = (atob(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("entidades/") + 42)));
                tablink = 'DataBase: ' + tablink.substring(9, tablink.indexOf(',')) + ' -- Entidade ID: ' + tablink.substring(19)
            }
            if (sec.value == 'compras' || sec.value == 'patrimonio' || sec.value == 'almoxarifado') {
                //alert(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("\exercicios")-1))
                tablink = (atob(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("\exercicios")-1)));
                tablink = 'DataBase: ' + tablink.substring(9, tablink.indexOf(',')) + ' -- Entidade ID: ' + tablink.substring(19)
            }
            if (sec.value == 'contratos') {
                //alert(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("\exercicios")-1))
                tablink = (atob(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("\exercicios")-1)));
                tablink = 'DataBase: ' + tablink.substring(9, tablink.indexOf(',')) + ' -- Entidade ID: ' + tablink.substring(21)
            }
            if (sec.value == 'obras') {
                //alert(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("entidades/") + 46))
                tablink = (atob(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("entidades/") + 46)));
                tablink = 'DataBase: ' + tablink.substring(9, tablink.indexOf(',')) + ' -- Entidade ID: ' + tablink.substring(21)
            }
            if (sec.value == 'convenios') {
                //alert(tablink.substring(tablink.indexOf("entidades/") + 10, tablink.indexOf("entidades/") + 46))
                tablink = (atob(tablink.substring(tablink.indexOf("entidades/") + 10)));
                tablink = 'DataBase: ' + tablink.substring(9, tablink.indexOf(',')) + ' -- Entidade ID: ' + tablink.substring(21)
            }
            cab.textContent = 'Informação da Base:';
            meuCabecalho.textContent = tablink;
        } else {
            cab.textContent = 'Informação da Base:';
            meuCabecalho.textContent = 'Sua aba não está em nenhum sistema, ou sistema não selecionado!';
        }
    });

    if (token.value != '') {
        const select = document.getElementById('select');
        var escolha = ''
        btninfo.remove()
        //REQUISIÇÃO TOKEN
        var url = "https://oauth.cloud.betha.com.br/auth/oauth2/tokeninfo?access_token=" + token.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, false);
        xhttp.send();
        var result = xhttp.responseText;

        if (xhttp.status >= 200 && xhttp.status <= 205) {
            const cab = document.getElementById('inftoken');
            cab.textContent = 'Informação do Token:';
            const tt = document.getElementById('status');
            var info = JSON.parse(result)['user']['attributes']['singleAccess']
            tt.textContent = 'DataBase: ' + JSON.parse(info)['databaseId'] + ' -- Entidade ID: ' + JSON.parse(info)['entityId'];
        } else {
            const cab = document.getElementById('inftoken');
            const tt = document.getElementById('status');
            cab.textContent = 'Informação do Token:';
            tt.textContent = 'Token pode estar invalido, não foi possivel realizar a consulta!'
        }
        //REQUISIÇÃO ENTIDADE
        if (select.value == 'contabilidade') {
            escolha = 'https://contabil-sl.cloud.betha.com.br/contabil/service-layer/v2/api/entidades/'
            var link = escolha + JSON.parse(JSON.parse(result)['user']['attributes']['singleAccess'])['entityId'];
            var req = new XMLHttpRequest();
            req.open("GET", link, false);
            req.setRequestHeader("Authorization", "bearer " + token.value)
            req.send();
            if (req.status >= 200 && req.status <= 205) {
                
                cnpj.textContent = 'CNPJ: ' + JSON.parse(req.responseText)['content']['entidade']['cnpj'];
                nome.textContent = 'Entidade: ' + JSON.parse(req.responseText)['content']['entidade']['nome'];
                
            } else {
                cnpj.textContent = 'Verificar se o sistema foi selecionado corretamente!'
                nome.textContent = ''
            }
        }
        if (select.value == 'compras') {
            escolha = 'https://compras.betha.cloud/compras-services/api/entidades/'
            var link = escolha + JSON.parse(JSON.parse(result)['user']['attributes']['singleAccess'])['entityId'];
            var req = new XMLHttpRequest();
            req.open("GET", link, false);
            req.setRequestHeader("Authorization", "bearer " + token.value)
            req.send();
            if (req.status >= 200 && req.status <= 205) {
                cnpj.textContent = 'CNPJ: ' + JSON.parse(req.responseText)['cnpj']
                nome.textContent = 'Entidade: ' + JSON.parse(req.responseText)['nome'];
            } else {
                cnpj.textContent = 'Verificar se o sistema foi selecionado corretamente!'
                nome.textContent = ''
            }
        }
        if (select.value == 'almoxarifado') {
            escolha = 'https://almoxarifado.betha.cloud/estoque-services/api/entidades/'
            var link = escolha + JSON.parse(JSON.parse(result)['user']['attributes']['singleAccess'])['entityId'];
            var req = new XMLHttpRequest();
            req.open("GET", link, false);
            req.setRequestHeader("Authorization", "bearer " + token.value)
            req.send();
            if (req.status >= 200 && req.status <= 205) {
                cnpj.textContent = 'CNPJ: ' + JSON.parse(req.responseText)['cnpj']
                nome.textContent = 'Entidade: ' + JSON.parse(req.responseText)['nome'];
            } else {
                cnpj.textContent = 'Verificar se o sistema foi selecionado corretamente!'
                nome.textContent = ''

            }
        }
        if (select.value == 'patrimonio') {
            escolha = 'https://patrimonio.betha.cloud/patrimonio-services/api/entidades/'
            var link = escolha + JSON.parse(JSON.parse(result)['user']['attributes']['singleAccess'])['entityId'];
            var req = new XMLHttpRequest();
            req.open("GET", link, false);
            req.setRequestHeader("Authorization", "bearer " + token.value)
            req.send();
            if (req.status >= 200 && req.status <= 205) {
                cnpj.textContent = 'CNPJ: ' + JSON.parse(req.responseText)['cnpj']
                nome.textContent = 'Entidade: ' + JSON.parse(req.responseText)['nome'];
            } else {
                cnpj.textContent = 'Verificar se o sistema foi selecionado corretamente!'
                nome.textContent = ''
            }
        }
        document.getElementById('div').innerHTML+='<center><a target="_blank" href='+url+'><button id="link" class="btn btn-outline-dark">Acessar validação do Token</button></a></center>'
        select.remove()
        button.remove()
        token.remove()
        txttoken.remove()
        adiciona.remove()
        document.getElementById('top').innerHTML += '<style>#top{border-color: #c0c0c0;}</style>'
    }
}