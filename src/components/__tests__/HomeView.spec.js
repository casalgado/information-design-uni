import { describe, it, expect } from "vitest";

import { shallowMount, mount } from "@vue/test-utils";
import HomeView from "@/views/user/HomeView.vue";

describe("HomeView", () => {
  it("renders title", () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.text()).toContain("KOFTA");
    expect(wrapper.text()).toContain("Cocina Fusion");
    expect(wrapper.text()).toContain("Hindú-Árabe");
  });

  // it("contains a button that takes the user to MenuView", () => {
  //   const wrapper = mount(HomeView);

  //   expect(wrapper.findAll("button").length).toEqual(1);
  //   expect(wrapper.findAll("button").at(0).text()).toEqual("Ver Menu");
  // });
});
