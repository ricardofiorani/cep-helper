CepHelper
=========

CepHelper é uma classe javascript que auxilia a consulta de um endereço através de webservices e que suporta redundancia de webservice .

  - Multi Web-Services (Caso um esteja offline, será utilizado o próximo webservice da lista)
  - Fácil Integração
  - Utiliza jQuery !

Versão
----

1.0

Dependências
-----------

CepHelper depende de algumas bibliotecas e algumas outras coisas para funcionar:

* [jQuery] - Utilizado para efetuar a requisição cross-domain ajax para os web-services
* [você] - Um bom programador que saiba o básico de orientação a objeto em javascript.

Instalação
--------------

```sh
git clone https://github.com/ricardofiorani/cep-helper/
```

Utilização
--------------
Declare a classe após a declaração jquery
```html
<script type="text/javascript" src="cephelper.class.js"></script>
```

```js
//Exemplo 1
cepConsultado = $('#input-zip').val(); //O Input com o CEP informado pelo usuário
cepClass = new CepHelper(cepConsultado); //Aqui instanciamos a classe CepHelper passando o CEP
resultado = cepClass.run(); // **Mágica**
console.log(resultado); //Aqui será retornado um JSON com o endereço
```


**Keep it Simple !**


[jQuery]:http://jquery.com
[você]:http://i.imgur.com/SBwbo4e.jpg
