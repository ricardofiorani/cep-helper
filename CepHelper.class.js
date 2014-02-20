function CepHelper(cepParam) {
    //@interface
    var cep;
    var cepRegexValidation;
    var cepServicesUrls;
    var currentCepServiceUrlPos;
    var requestResponseObj;
    var responseObj;
    var cepStringPosition;
    //@end

    //@construct
    this.cepServicesUrls = [
        'http://cep.republicavirtual.com.br/web_cep.php?cep=%CEP_POS%&formato=json',
        'http://cep.correiocontrol.com.br/%CEP_POS%.json',
        'http://cep.paicon.com.br/json/%CEP_POS%',
        'http://viacep.com.br/ws/%CEP_POS%/json/',
    ];
    this.cepRegexValidation = /^\d{5}\-?\d{3}$/;
    this.currentCepServiceUrlPos = 0;
    this.cep = cepParam;
    this.cepStringPosition = '%CEP_POS%';
    //@end


    this.setStrMarkupReplace = function(_strMarkupReplace) {
        this.cepStringPosition = _strMarkupReplace;
    };

    this.getStrMarkupReplace = function() {
        return this.cepStringPosition;
    };

    this.setCep = function(_Cep) {
        this.cep = _Cep;
    };

    this.getCep = function() {
        return this.cep;
    };

    this.getCepWithNumberOnly = function() {
        return this.getCep().replace('-', '');

    };

    this.getServicesUrlList = function() {
        return this.cepServicesUrls;
    };

    this.getServiceUrl = function() {
        return this.getServicesUrlList()[this.getCurrentCepServiceUrlPos()].replace(this.getStrMarkupReplace(), this.getCepWithNumberOnly());
    };

    this.setRequestResponseObj = function(_RequestResponseObj) {
        this.RequestResponseObj = _RequestResponseObj;
    };

    this.getRequestResponseObj = function() {
        return this.RequestResponseObj;
    };

    this.setCurrentCepServiceUrlPos = function(_currentCepServiceUrlPos) {
        this.currentCepServiceUrlPos = _currentCepServiceUrlPos;
    };

    this.getCurrentCepServiceUrlPos = function() {
        return this.currentCepServiceUrlPos;
    };

    this.setResponseObj = function(_responseObj) {
        this.responseObj = _responseObj;
    };

    this.getResponseObj = function() {
        return this.responseObj;
    };

    this.validateCep = function() {
        return this.cepRegexValidation.test(this.cep, this.cepRegexValidation);
    };

    this.processResponse = function(data) {
        this.setResponseObj(this.getRequestResponseObj().responseText);
    };

    this.doAjax = function() {
        this.setRequestResponseObj(jQuery.ajax({
            url: this.getServiceUrl(),
            dataType: 'json',
            type: 'GET',
            crossDomain: true,
            cache: false,
            async: false,
        }));
        this.processResponse();
    };

    this.validateAjaxResponse = function() {
        var requestResponseCode = this.getRequestResponseObj().status;
        return requestResponseCode !== 404 && requestResponseCode !== 0;
    };

    this.run = function() {
        if (this.validateCep()) {
            for (var index = 0; index < this.getServicesUrlList().length; index++)
            {
                this.setCurrentCepServiceUrlPos(index);
                this.doAjax();
                if (this.validateAjaxResponse()) {
                    return this.getResponseObj();
                }
            }
            alert('Nenhum WebService disponível para consulta no momento');
        } else {
            alert('Cep Inválido');
        }
    };

}
