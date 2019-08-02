export class Servicios{
    constructor(
        public id:Int16Array,
        public nombre: string, 
        public estado: number, 
        public descripcion: string,
        public detalleCambio:string,
        public usuarioModifica: any

        ) {}

    public static fromJson(element: any) {
        return new Servicios(
            element.Id,
            element.Title, 
            element.estado, 
            element.descripcion,
            element.detalleCambio,
            element.usuarioModifica
            );
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}