import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { City } from 'src/app/models/city';
import { Editor, Toolbar } from "ngx-editor";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers: [CityService]
})
export class CityAddComponent implements OnInit {

  constructor(private cityService: CityService,
    private formbuilder: FormBuilder,
    private authservice: AuthService
  ) { }


  city: City = new City;
  cityAddForm!: FormGroup;
  editor!: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];
  createCityForm() {
    this.cityAddForm = this.formbuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required]
      })
  }


  ngOnInit() {
    this.createCityForm();
    this.editor = new Editor();
  }

  add() {
    if (this.cityAddForm.valid) {
      this.city = Object.assign({}, this.cityAddForm.value)
      this.city.userId = this.authservice.getCurrentUserId();
      this.cityService.add(this.city);

    }
  }
}
