import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToBr'
})
export class NewlineToBrPipe implements PipeTransform {
  private headingCount = 0;

  transform(value: string): string {
    if (!value) return value;
    this.headingCount = 0;
    let formattedText = value.replace(/- \*\*(.*?)\*\*/g, (match, p1) => {
      this.headingCount++;
      return `<h4 style="font-size: 1.0rem; color: #ff6f61; font-weight: bold; text-decoration: underline; margin-bottom: 10px;">${this.headingCount}. ${p1}</h4>`;
    });
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
  }
}
