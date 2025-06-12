import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nestedValue',
    standalone: true
})
export class NestedValuePipe implements PipeTransform {
    transform(obj: any, path: string): any {
        if (!obj || !path) return null;

        // Masalan: transactions[0].provider => transactions.0.provider
        const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.');

        return parts.reduce((acc, key) => {
            if (acc === undefined || acc === null) return null;
            return acc[key];
        }, obj);
    }
}
