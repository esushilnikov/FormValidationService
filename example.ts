export class EditComponent implements OnInit {
      
      form: FormGroup;

      // Error container
      nameError$: Observable<string>;
    
      constructor(private fb: FormBuilder,
                  private formValidationService: FormValidationService) {
      }
        
      get nameControl(): FormControl {
        return this.form.get('name') as FormControl;
      }
    
      ngOnInit(): void {
        
         // Init form 
         this.form = new FormGroup({});
        
         // Add control
         this.form.addControl('name', this.fb.control('', Validators.required, this.uniqueNameAsyncValidator()));
        
         // Bind error result to error container.
         // Fetch error messages using the control error codes         
         // With async validation to show both errors
         // this.nameError$ = merge(
         //   this.formValidationService.error$(this.nameControl),
         //   this.formValidationService.asyncError$(this.nameControl)
         // );
      }
        
       private uniqueNameAsyncValidator(): AsyncValidatorFn {
        return (input: FormControl) => timer(500).pipe(
            distinctUntilChanged(),
            switchMap(() => apiCall(input.value)),
            map(response => response.valid ? null : { unique: true }));
    }
      
}

//////HTML////////
// This case uses bootstrap approach showing errors via is-invalid class on main element (elements should be siblings)
<any-control [formControlName]="'name'"
             [class.is-invalid]="nameError$ | async"></any-control>
<div class="invalid-feedback position-absolute">
    <span [textContent]="nameError$ | async"></span>
</div>
