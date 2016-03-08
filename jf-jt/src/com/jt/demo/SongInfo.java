package com.jt.demo;

import com.jfinal.plugin.activerecord.Model;

import java.io.Serializable;

/**
 * @author wangxuekai
 * @date 2016-03-05
 */
public class SongInfo  extends Model<SongInfo> implements Serializable{
    private static final long serialVersionUID = -4113332232471486418L;
    private String musicId;
    private String songName;
    private String artist;
    private String artistId;
    private String album;
    private String mp3size;
    private String artistPic;
    private String mp3Url;

    public String getMusicId() {
        return musicId;
    }

    public void setMusicId(String musicId) {
        this.musicId = musicId;
    }

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getArtistId() {
        return artistId;
    }

    public void setArtistId(String artistId) {
        this.artistId = artistId;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getMp3size() {
        return mp3size;
    }

    public void setMp3size(String mp3size) {
        this.mp3size = mp3size;
    }

    public String getArtistPic() {
        return artistPic;
    }

    public void setArtistPic(String artistPic) {
        this.artistPic = artistPic;
    }

    public String getMp3Url() {
        return mp3Url;
    }

    public void setMp3Url(String mp3Url) {
        this.mp3Url = mp3Url;
    }

    @Override
    public String toString() {
        return "SongInfo{" +
                "musicId='" + musicId + '\'' +
                ", songName='" + songName + '\'' +
                ", artist='" + artist + '\'' +
                ", artistId='" + artistId + '\'' +
                ", album='" + album + '\'' +
                ", mp3size='" + mp3size + '\'' +
                ", artistPic='" + artistPic + '\'' +
                ", mp3Url='" + mp3Url + '\'' +
                '}';
    }
}
