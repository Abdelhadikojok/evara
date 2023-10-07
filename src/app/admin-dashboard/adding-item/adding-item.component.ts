import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { HttpService } from 'src/app/services/http.service';
import * as alertify from 'alertifyjs'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-adding-item',
  templateUrl: './adding-item.component.html',
  styleUrls: ['./adding-item.component.css']
})
export class AddingItemComponent implements OnInit, OnDestroy {
  imageOneUrl = ""
  imageTwoUrl = ""
  updateMode = false;
  selectedCategory = ""
  id = ""
  item: Item = {
    id: "",
    name: "",
    description: "",
    images: {
      imageOne: "",
      imageTwo: ""
    },
    category: "",
    brand: "",
    reviewsNb: 0,
    reviewsTotal: 0,
    price: 0,
    likes: 0,
    quantity: 0,
    selledNb: 0,
    favorite: false,
    postDate: new Date()
  }

  categories: string[] = [
    'clothes', 'handbag', 'sandal', 'caps', 'shoes', 'pillowcase', 'hats', 'jumpsuits'
  ];

  categoriees: any[] = [
    {
      id: 1,
      name: "clothes"
    },
    {
      id: 2,
      name: 'handbag'
    },
    {
      id: 3,
      name: 'sandal'
    },
    {
      id: 4,
      name: 'caps'
    },
    {
      id: 5,
      name: 'shoes'
    },
    {
      id: 6,
      name: 'pillowcase'
    },
    {
      id: 7,
      name: 'hats'
    },
    {
      id: 8,
      name: 'jumpsuits'
    },
  ];

  getDataByIdSubscription !: Subscription
  adminUpdateItemSubscription !: Subscription
  adminPostItemSubscription !: Subscription

  constructor(private fireStorage: AngularFireStorage,
    private httpService: HttpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.id = queryParams['update'];

      console.log('Query Parameter "update":', this.id);

      if (this.id) {
        this.updateMode = true
        this.getDataByIdSubscription = this.httpService.getDataById(this.id).subscribe(res => {
          this.item = res
          this.imageOneUrl = res.images.imageOne
          this.imageTwoUrl = res.images.imageTwo
          this.selectedCategory = res.category
        })
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.item = {
        name: form.value.name,
        description: form.value.description,
        images: {
          imageOne: this.imageOneUrl,
          imageTwo: this.imageTwoUrl
        },
        category: form.value.category,
        brand: form.value.brand,
        reviewsNb: 0,
        reviewsTotal: 0,
        price: form.value.price,
        likes: 0,
        quantity: form.value.quantity,
        selledNb: 0,
        favorite: false,
        postDate: new Date()
      }
      console.log('Form submited successfully:', this.item);
      if (this.updateMode) {
        this.adminUpdateItemSubscription = this.httpService.adminUpdateItem(this.id, this.item).subscribe(res => {
          console.log('successes update', res);
          alertify.success('post is update')
          form.reset()
        }, err => {
          alertify.error('upadte is faild ')
        })
      } else {
        this.adminPostItemSubscription = this.httpService.addminPostItem(this.item).subscribe(res => {
          console.log(res)
          alertify.success('post is added successfully')
          form.reset()
        }, err => {
          alertify.error('adding item is faild ')
        })
      }
    }
  }
  async onFileChange(event: any) {
    const img = event.target.files[0]
    if (img) {
      const path = `yt/${img.name}`
      const uploadTask = await this.fireStorage.upload(path, img)
      this.imageOneUrl = await uploadTask.ref.getDownloadURL()
    }
    console.log(img);


  }

  async onFileChange2(event: any) {
    const img = event.target.files[0]
    if (img) {
      const path = `yt/${img.name}`
      const uploadTask = await this.fireStorage.upload(path, img)
      this.imageTwoUrl = await uploadTask.ref.getDownloadURL()
    }
    console.log(img);
  }

  ngOnDestroy(): void {
    if (this.adminPostItemSubscription) {
      this.adminPostItemSubscription.unsubscribe()
    }
    if (this.adminUpdateItemSubscription) {
      this.adminUpdateItemSubscription.unsubscribe()
    }
    if (this.getDataByIdSubscription) {
      this.getDataByIdSubscription.unsubscribe()
    }
  }
}
