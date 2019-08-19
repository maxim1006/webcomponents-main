import { h } from "@stencil/core";
// @Component({
//     tag: 'm-fetch-row',
// })
// export class MFetchRow {
//     @Prop()
//     name: string;
//
//     @Prop()
//     age: string;
//
//     render() {
//         return (
//             <tr>
//                 <td>{this.name}</td>
//                 <td>{this.age}</td>
//             </tr>
//         );
//     }
// }
export const MFetchRow = ({ name, age }) => {
    return (h("tr", null,
        h("td", null, name),
        h("td", null, age)));
};
