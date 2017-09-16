import equal from '@async-generators/equal';
import filter from '../src';
import { expect } from 'chai';

describe("@async-generator/filter", () => {
  it("should throw error if source is not iterable", async () => {
    let error: Error;
    try {
      for await (const _ of filter(<any>{}, () => true));
    } catch (err) {
      error = err.message;
    }
    expect(error).to.be.eq("source parameter is not iterable");
  })
  it("should yield all source items if predicate returns true", async () => {
    let source = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }
    expect(await equal(source(), filter(source(), () => true)));
  })

  it("should yield all source items if predicate returns true", async () => {
    let source = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }
    let expected = async function* () {
      yield 2; 
    }
    expect(await equal(source(), filter(source(), (x) => x > 1 && x < 3)));
  })

  it("should await predicate", async () => {
    let source = async function* () {
      yield 1; yield 2; yield 3; yield 4;
    }
    let expected = async function* () {
      yield 2; 
    }

    let predicate = (x) => new Promise<boolean>(r=>setTimeout(()=>r(x > 1 && x < 3), 10));

    expect(await equal(source(), filter(source(), predicate)));
  })

  it("should pass item index (sequence order) of value to predicate", async () => {
    let source = async function* () {
      yield "a"; yield "b"; yield "c"; yield "d";
    }
    let index = 0;
    let expected = [0, 1, 2, 3];
    let result = [];

    for await (const _ of filter(source(), (x, i) => { result.push(i); return true }));

    expect(expected).to.be.eql(result);
  })
})