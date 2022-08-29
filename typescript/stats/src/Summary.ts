import { MatchData } from './MatchData';
import { WinsAnalysis } from './analizers/WinsAnalysis';
import { HtmlReport } from './reportTarget/HtmlReport';

export interface Analyzer {
  run(matches: MatchData[]): string;
}

export interface OutputTarget {
  print(report: string): void;
}

export class Summary {
  constructor(public analizer: Analyzer, public outputTarget: OutputTarget) { };

  static winsAnalysisWithHtmlReport(team: string): Summary {
    return new Summary(
      new WinsAnalysis(team),
      new HtmlReport()

    );
  }
  buildAndPrintReport(matches: MatchData[]): void {
    const output = this.analizer.run(matches);
    this.outputTarget.print(output);
  }
}