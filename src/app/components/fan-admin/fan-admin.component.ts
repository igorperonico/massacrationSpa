import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Albums } from '../../models/albums.models';
import { Songs } from '../../models/songs.models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-fan-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fan-admin.component.html',
  styleUrl: './fan-admin.component.css'
})
export class FanAdminComponent {
  Album: Albums = {
    id: 0,
    title: '',
    releaseDate: '',
    coverUrl: ''
  };

  Songs: Songs[] = [{
    id: 0,
    albumId: 0,
    title: '',
    length: '',
    youTubeUrl: ''
  }]

  constructor(private apiService: ApiService) { }

  addSong() {
    this.Songs.push({
      id: 0,
      albumId: 0,
      title: '',
      length: '',
      youTubeUrl: ''
    });
  }
  removeSong(index: number) {
    this.Songs.splice(index, 1);
  }


  onSubmitAlbum() {
    this.apiService.getAlbums().subscribe(albums => {
      const nextAlbumId = albums.length > 0 ? Math.max(...albums.map(a => a.id)) + 1 : 1;

      const newAlbum: Albums = {
        id: nextAlbumId,
        title: this.Album.title,
        releaseDate: this.Album.releaseDate,
        coverUrl: this.Album.coverUrl
      };

      this.apiService.addAlbum(newAlbum).subscribe(albumResponse => {
        console.log('Album registered successfully!', albumResponse);

        this.apiService.getSongs().subscribe(songs => {
          let nextSongId = songs.length > 0 ? Math.max(...songs.map(s => s.id)) + 1 : 1;

          this.Songs.forEach(song => {
            const newSong = {
              id: nextSongId++,
              albumId: albumResponse.id,
              title: song.title,
              length: song.length,
              youTubeUrl: song.youTubeUrl
            };

            this.apiService.addSong(newSong).subscribe(songResponse => {
              console.log('Song registered successfully!', songResponse);
            });
          });
        });

        this.Album = { id: 0, title: '', releaseDate: '', coverUrl: '' };
        this.Songs = [{ id: 0, albumId: 0, title: '', length: '', youTubeUrl: '' }];
      });
    });
  }
}
