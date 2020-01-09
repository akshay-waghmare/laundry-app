import { DynamicFormbuilderModule } from './dynamic-formbuilder.module';

describe('DynamicFormbuilderModule', () => {
  let dynamicFormbuilderModule: DynamicFormbuilderModule;

  beforeEach(() => {
    dynamicFormbuilderModule = new DynamicFormbuilderModule();
  });

  it('should create an instance', () => {
    expect(dynamicFormbuilderModule).toBeTruthy();
  });
});
