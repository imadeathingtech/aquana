import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';

@Component({
  selector: 'aquana-plant-capture-image',
  templateUrl: './plant-capture-image.component.html',
  styleUrls: ['./plant-capture-image.component.scss'],
})
export class PlantCaptureImageComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  currentImage: string = '';

  constructor(private plantService: PlantService, private router: Router) {}

  ngOnInit(): void {
    this.startStreamingVideo();
  }

  ngOnDestroy() {
    this.stopStreamingVideo();
  }

  startStreamingVideo() {
    if (this.imageContainer) {
      this.imageContainer.nativeElement.classList.add('hidden');
    }
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
      .then((stream) => {
        this.videoPlayer.nativeElement.classList.remove('hidden');
        this.videoPlayer.nativeElement.srcObject = stream;
        this.videoPlayer.nativeElement.onloadedmetadata = () => {
          this.videoPlayer?.nativeElement.play();
        };
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  }

  stopStreamingVideo() {
    const stream = this.videoPlayer.nativeElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track: any) => {
        track.stop();
      });
    }
    this.videoPlayer.nativeElement.srcObject = null;
    this.videoPlayer.nativeElement.classList.add('hidden');
  }

  takePicture() {
    let ctx = this.imageContainer.nativeElement.getContext('2d');
    ctx.drawImage(
      this.videoPlayer.nativeElement,
      0,
      0,
      this.imageContainer.nativeElement.width,
      this.imageContainer.nativeElement.height
    );

    this.currentImage =
      this.imageContainer.nativeElement.toDataURL('image/png');
    this.imageContainer.nativeElement.classList.remove('hidden');
    this.stopStreamingVideo();
  }

  retry() {
    this.startStreamingVideo();
    this.currentImage = '';
  }

  saveImage() {
    console.log(this.currentImage);
    this.plantService.saveImage(this.currentImage).subscribe((result: any) => {
      this.router.navigate(['plants/create'], {
        queryParams: { file: result.file },
      });
    });
  }
}
