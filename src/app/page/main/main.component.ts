import { Component, OnInit } from '@angular/core';
import { DataTable } from 'src/app/admin/core/models/datatable';
import { ClassService } from 'src/app/admin/core/services/class.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  classes = new DataTable();
  defaultThumbnailUrl: string = 'https://insightcampus.s3.ap-northeast-2.amazonaws.com/thumbnail_class/none.png';

  constructor(private classService: ClassService) {
    this.classes.pageNumber = 1;
    this.classes.size = 4;
  }

  ngOnInit() {
    this.getClass();
    this.slide();
    setInterval(this.slide, 7000);
  }

  getClass() {
    this.classService.getClasses(this.classes).subscribe(data => {
      this.classes = data;

    });
  }


  slide() {
    const showingClass = "showing";
    const fadeInUpClass = "fadeInUp";
    const animatedClass = "animated";
    const dotActiveClass = "dot-active";

    const dots = document.querySelectorAll(".dot");
    const slides = document.querySelectorAll(".main-content");
    const firstSlide = document.querySelectorAll(".main-content")[0];
    const firstContent = firstSlide.firstElementChild;
    const currentSlide = document.querySelector('.showing');

    if(currentSlide) {
      var currentDot, nextDot;
      if(slides[0] == currentSlide) {
        currentDot = dots[0];
        nextDot = dots[1];
      }
      if(slides
        [1] == currentSlide) {
        currentDot = dots[1];
        nextDot = dots[2];
      }
      if(slides[2] == currentSlide) {
        currentDot = dots[2];
        nextDot = dots[0];
      }

      const currentContent = currentSlide.firstElementChild;
      const nextSlide = currentSlide.nextElementSibling; 

      currentSlide.classList.remove(showingClass);
      currentContent.classList.remove(fadeInUpClass);
      currentContent.classList.remove(animatedClass);
      currentDot.classList.remove(dotActiveClass);
      nextDot.classList.add(dotActiveClass);

      if(nextSlide) {
        const nextContent = nextSlide.firstElementChild;
        console.log("Inner = " + currentContent.innerHTML);
        nextSlide.classList.add(showingClass);
        nextContent.classList.add(fadeInUpClass);
        nextContent.classList.add(animatedClass);
      } else {
        firstSlide.classList.add(showingClass);
        firstContent.classList.add(fadeInUpClass);
        firstContent.classList.add(animatedClass);
      }

      
    }
    else {
      firstSlide.classList.add(showingClass);
      firstContent.classList.add(fadeInUpClass);
      firstContent.classList.add(animatedClass);
      dots[0].classList.add(dotActiveClass);
    }

  }

  dotSlide(dotNum) {
    const showingClass = "showing";
    const fadeInUpClass = "fadeInUp";
    const animatedClass = "animated";
    const dotActiveClass = "dot-active";
    
    const currentSlide = document.querySelector('.showing');
    const dots = document.querySelectorAll(".dot");
    const slides = document.querySelectorAll(".main-content");

    if(currentSlide) {
      var currentDot;
      if(slides[0] == currentSlide) {
        currentDot = dots[0];
      }
      if(slides[1] == currentSlide) {
        currentDot = dots[1];
      }
      if(slides[2] == currentSlide) {
        currentDot = dots[2];
      }

      const currentContent = currentSlide.firstElementChild;
      currentSlide.classList.remove(showingClass);
      currentContent.classList.remove(fadeInUpClass);
      currentContent.classList.remove(animatedClass);
      currentDot.classList.remove(dotActiveClass)
    }

 
    const slide = document.querySelectorAll(".main-content")[dotNum-1];
    const content = slide.firstElementChild;

    slide.classList.add(showingClass);
    content.classList.add(fadeInUpClass);
    content.classList.add(animatedClass);
    dots[dotNum-1].classList.add(dotActiveClass);
 
  }



}
