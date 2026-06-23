import './App.css'

import { useState } from 'react';

function App() {

  const [ hourlyWage, setHourlyWage ] = useState('');
  const [ workHours, setWorkHours ] = useState('');

  const removeComma = (value: string) => {
    return value.replace(/,/g, '');
  };

  const formatNumberWithComma = (value: string) => {
    const onlyNumber = value.replace(/[^0-9]/g, '');

    if (onlyNumber === '') {
      return '';
    }

    return Number(onlyNumber).toLocaleString();
  };

  const calculateFutureAssetWithYearlyInvestment = (
    yearlyInvestment: number,
    annualReturnRate: number,
    totalYears: number
  ) => {
    let futureAsset = 0;

    for (let year = 1; year <= totalYears; year++) {
      const remainingYears = totalYears - year;
      futureAsset = futureAsset + yearlyInvestment * Math.pow(1 + annualReturnRate, remainingYears);
    }

    return futureAsset;
  };

  const formatKoreanMoney = (amount: number) => {
    const flooredAmount = Math.floor(amount);

    const kyeong = Math.floor(flooredAmount / 1_0000_0000_0000_0000);
    const jo = Math.floor(flooredAmount % 1_0000_0000_0000_0000 / 1_0000_0000_0000);
    const eok = Math.floor(flooredAmount % 1_0000_0000_0000 / 1_0000_0000);
    const maan = Math.floor(flooredAmount % 1_0000_0000 / 1_0000);
    const won = flooredAmount % 1_0000;

    const parts = [];

    if (kyeong > 0) {
      parts.push(`${kyeong}경`);
    }

    if (jo > 0) {
      parts.push(`${jo}조`);
    }

    if (eok > 0) {
      parts.push(`${eok}억`);
    }

    if (maan > 0) {
      parts.push(`${maan}만`);
    }

    if (won > 0 || parts.length === 0) {
      parts.push(`${won}원`);
    }

    return parts.join(' ');
  };

  const numericHourlWage = Number(removeComma(hourlyWage));
  const numericWorkHors = Number(workHours);

  const workDaysPerYear = '250';
  const numericWorkDaysPerYear = Number(workDaysPerYear);

  const dailyPay = numericHourlWage * numericWorkHors;
  const yearlyIncome = dailyPay * numericWorkDaysPerYear;

  const annualReturnRate = 0.2;
  const investmentYears = 30;

  const futureAsset = calculateFutureAssetWithYearlyInvestment(
    yearlyIncome,
    annualReturnRate,
    investmentYears
  );

  const flooredFutureAsset = Math.floor(futureAsset);

  const isDailyPayCalculable =
    hourlyWage !== '' &&
    workHours !== '' &&
    numericHourlWage > 0 &&
    numericWorkHors > 0;

  const isFutureAssetCalculable =
    isDailyPayCalculable &&
    // workDaysPerYear !== '' &&
    numericWorkDaysPerYear > 0;

  return (
    <main className="p-6">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1>단기 알바 시급-일급 계산 웹 앱</h1>
          <p>
            근무시간과 시급을 입력하여 일급을 계산합니다.
            <br />
            1년 근무 수익과 미래 자산도 시뮬레이션합니다.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full max-w-48 mx-auto">
          <label htmlFor="hourlyWage">시급</label>
          <input 
            id="hourlyWage"
            className="border px-3 py-2 text-center"
            type="text"
            inputMode="numeric"
            value={hourlyWage}
            onChange={(event) =>{
              const formattedValue = formatNumberWithComma(event.target.value);
              setHourlyWage(formattedValue)}}
            placeholder="2026년 최저시급 10,320원"
          />
        </div>

        <div className="flex flex-col gap-2 w-full max-w-48 mx-auto">
          <label htmlFor="workHours">근무시간</label>
          <input
            id="workHours"
            className="border px-3 py-2 text-center"
            type="number"
            value={workHours}
            onChange={(e) => setWorkHours(e.target.value)}
            placeholder="근무시간"
          />
        </div>

        <div className="space-y-6">
          <h2>계산 결과</h2>
          
          {isDailyPayCalculable ? (
            <div className="space-y-2">
              <p>
                일급은 {' '}
                <strong className="text-xl">{dailyPay.toLocaleString()}원</strong>입니다.
              </p>
            </div>
          ) : (
            <p>시급과 근무시간을 입력해주세요.</p>
          )}

          {isFutureAssetCalculable ? (
            <div className="space-y-3">
              <h2>미래 자산 시뮬레이션</h2>

              <div>
                <p>1년에 250일 근무 시, 1년 근무 수익은 <strong className="text-xl">{yearlyIncome.toLocaleString()}</strong>원 입니다.</p>
              </div>

              <div>
                <p>
                  이 금액을 연 20% 수익률로 30년간 굴리면
                  <br />
                  예상 자산은 {' '}
                  <strong className="text-xl">
                    {formatKoreanMoney(flooredFutureAsset)} (₩ {flooredFutureAsset.toLocaleString()})
                  </strong> 입니다.
                </p>
              </div>

              <div>
                <p className="mt-2 text-xs text-gray-500">
                  * 본 결과는 입력값과 연 20% 수익률을 단순 가정한 시뮬레이션입니다.
                </p>
              </div>
            </div>
          ) : (
            <p>미래 자산 시뮬레이션이 진행되지 않고 있습니다.</p>
          )} 
        </div>

      </section>
    </main>
  );

}
export default App