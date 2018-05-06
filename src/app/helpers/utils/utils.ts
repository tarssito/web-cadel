export class Utils {
    /* Function to validate the email */
    public static validateEmail(email: string) {
        var patt = new RegExp(/^([A-z]|[0-9]|\.|\_\.|\-)+@+(([A-z]|[0-9])*)(\.(\w*))(\.(\w*)+(\.(\w*))?)?/);
        return patt.test(email);
    }

    /* Function to validate the CPF number */
    public static validateCpf(strCPF) {
        var _sum;
        var _rst;
        _sum = 0;
        if (strCPF == "00000000000") return false;

        var i = 0;
        for (i = 1; i <= 9; i++) _sum = _sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        _rst = (_sum * 10) % 11;

        if ((_rst == 10) || (_rst == 11)) _rst = 0;
        if (_rst != parseInt(strCPF.substring(9, 10))) return false;

        var i = 0;
        _sum = 0;
        for (i = 1; i <= 10; i++) _sum = _sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        _rst = (_sum * 10) % 11;

        var i = 0;
        if ((_rst == 10) || (_rst == 11)) _rst = 0;
        if (_rst != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }
}