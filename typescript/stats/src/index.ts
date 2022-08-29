import { MatchReader } from "./MatchReader";
import { Summary } from './Summary';

// Crea una instancia de MatchReader y le pasa algo que satisface la interfaz DataReader
const matchReader = MatchReader.fromCsv('football.csv');
const summary = Summary.winsAnalysisWithHtmlReport('Man United');

matchReader.load();
summary.buildAndPrintReport(matchReader.matches);
