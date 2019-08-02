export class Historial{
    constructor(
        public id:number,       
        public estado: string,        
        public detalleCambio:string,
        public usuarioModifica: any,
        public fechaModificacion: Date,
        public servicio: any
        ){}

    public static fromJson(element: any) {
        return new Historial(
            element.Id,
            element.Estado, 
            element.DetalleCambio,
            element.usuarioModifica,
            element.fechaModificacion,
            element.servicio
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