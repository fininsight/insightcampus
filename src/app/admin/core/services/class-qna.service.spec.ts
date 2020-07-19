/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from "@angular/core/testing";
import { ClassQnaService } from "./class-qna.service";

describe("Service: ClassQna", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClassQnaService],
    });
  });

  it("should ...", inject([ClassQnaService], (service: ClassQnaService) => {
    expect(service).toBeTruthy();
  }));
});
