import { CustomerHttpProvider } from './../../providers/http/customer-http';
import {
  Component,
  ViewChild
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  TextInput,
  LoadingController
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

  photoPreview = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private customerHttp: CustomerHttpProvider,
    private loadingCtrl: LoadingController
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      photo: ''
    });
  }

  submit() {
    const loader = this.loadingCtrl.create({
      content:"Carregando"
    });
    loader.present();
    this.customerHttp.create(this.form.value)
    .subscribe(() => {
      loader.dismiss();
      this.navCtrl.setRoot('MainPage');
    },
    (error)=>{
      loader.dismiss();
      console.log(error);
    });
    return false;
  }

  onChoosePhoto(files: FileList) {
    console.log(files);
    if(!files.length){
      return;
    }
    this.makePhotoPreview(files[0]);
    this.form.get('photo').setValue(files[0]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerCreatePage');
  }

  selectPhoto() {
    const nativeElement = this.inputFilePhoto.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.click();
  }

  makePhotoPreview(file: File) {
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onloadend = (event: ProgressEvent) => {
      const target = event.target;
      this.photoPreview = (<any>target).result;
    }
  }

  removePhoto() {
    const nativeElement = this.inputFilePhoto.getElementRef().nativeElement;
    const inputFile = nativeElement.querySelector('input');
    inputFile.value='';
    this.photoPreview = null;
    this.form.get('photo').setValue(null);
  }


}
