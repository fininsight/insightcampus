export class FinWork {
  work_seq: number;             // pk (자동입력)
  work_name: string;             // 사업명
  start_date: Date;                // 사업시작일
  end_date: Date;                 // 사업종료일
  expected_sales: number;      // 예상매출
  expected_purchase: number; // 예상매입
  sales: number;                   // 매출
  purchase: number;             // 매입
}
