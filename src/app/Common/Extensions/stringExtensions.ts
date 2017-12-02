export interface String {
}

declare global {
    interface String {
        isAllDigits(): boolean;
    }
}

String.prototype.isAllDigits = function () {
    var regex:RegExp = /[0-9]*/;
    return regex.test(this);
}