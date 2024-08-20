import { Component, OnInit } from '@angular/core';
import { Albums } from '../../models/albums.models';
import { CommonModule } from '@angular/common';
import { Songs } from '../../models/songs.models';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from 'express';

@Component({
  selector: 'app-discography',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './discography.component.html',
  styleUrl: './discography.component.css'
})
export class DiscographyComponent implements OnInit {
  albums: Albums[] = []
  songs: Songs[] = []

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAlbums()

    this.getSongs()
  }

  getAlbums() {
    this.apiService.getAlbums().subscribe((data) => {
      this.albums = data;
    },
      (error) => {
        console.error('Erro ao carrgar os albums', error)
      })
  }

  getSongs() {
    this.apiService.getSongs().subscribe((data) => {
      this.songs = data;
    },
      (error) => {
        console.error('Erro ao carrgar as songs', error)
      })
  }

  getSongsForAlbum(albumId: number): Songs[] {
    return this.songs.filter((song) => song.albumId === +albumId);
  }


}
