export class Servicios{
    constructor(
        public nombre: string, 
        public estado: number, 
        public descripcion: string,
        public usuarioModifica: any

        ) {}

    public static fromJson(element: any) {
        return new Servicios(
            element.Title, 
            element.estado, 
            element.descripcion,
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