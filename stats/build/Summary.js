"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WinsAnalysis_1 = require("./analizers/WinsAnalysis");
var HtmlReport_1 = require("./reportTarget/HtmlReport");
var Summary = /** @class */ (function () {
    function Summary(analizer, outputTarget) {
        this.analizer = analizer;
        this.outputTarget = outputTarget;
    }
    ;
    Summary.winsAnalysisWithHtmlReport = function (team) {
        return new Summary(new WinsAnalysis_1.WinsAnalysis(team), new HtmlReport_1.HtmlReport());
    };
    Summary.prototype.buildAndPrintReport = function (matches) {
        var output = this.analizer.run(matches);
        this.outputTarget.print(output);
    };
    return Summary;
}());
exports.Summary = Summary;
