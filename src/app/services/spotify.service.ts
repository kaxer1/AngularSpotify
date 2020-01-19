import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

//importar map reactive extentions
import { map } from "rxjs/operators";

// Por lo general cuando se trabaja con API
// Es necesario Centralizar la Informacion por eso este Service

// Este servicio se va a poder Inyectar en otros Componentes

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _http:HttpClient) { }

  // Para  consulta generica
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    //Pipe transformacion de Datos
    // Defino Headers que API de Spotify Necesita
    const headers = new HttpHeaders({
      Authorization:
        "Bearer BQApGvaT1W5Fm8794Gvl4yE_l4qStcP_yzjJ5H266nANbkoOiUxQy9NOE7raGucL6GDpFrG0zbmmt8wH7xxRZb3GElc-LS26NIITbKk8_BWk261xzeL83Ck2t8G9Qsucd6irdJnpcQi1G3u3P3cUIL5DkzusWvidP1nE4zrW5rnieQk"
    });
    
    return this._http.get(url, { headers });
  }

  //Cuando API Spotify envia la respuesta envia demasiada informacion y MAP
  //simplemente me filtra lo que a mi me sirve

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20&country=EC").pipe(
      map(data => data["albums"].items)
    );
  }

  // Referente al Search

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data["artists"].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=ec`).pipe(
      map(data => data["tracks"])
    );
  }
}
