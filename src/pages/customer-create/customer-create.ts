import { CustomerHttpProvider } from './../../providers/http/customer-http';
import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  TextInput
} from 'ionic-angular';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

/**
 * Generated class for the CustomerCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-create',
  templateUrl: 'customer-create.html',
})
export class CustomerCreatePage {

  @ViewChild('inputFilePhoto')
  inputFilePhoto: TextInput;

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private customerHttp: CustomerHttpProvider
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      photo: ''
    });
  }

  submit() {
    this.customerHttp.create(this.form.value)
    .subscribe(() => {
      console.log('cliente criado');
    });
    return false;
  }

  onChoosePhoto(files: FileList) {

    if(!files.length){
      return;
    }

    this.form.get('photo').setValue(files[0]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCreatePage');
  }

  selectPhoto() {
    const nativeElement = this.inputFilePhoto.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    console.log(inputFile);
    inputFile.click();

  }
}
