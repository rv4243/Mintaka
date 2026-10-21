import { Truck, Warehouse, Navigation, ShieldAlert, FileCheck, Package, CheckCircle2 } from "lucide-react";
import { SUPPLY_CHAIN_CAPABILITIES } from "../data/polymerData";

export default function SupplyChainSection() {
  const iconList = [Warehouse, FileCheck, Navigation, ShieldAlert, Truck];

  const workflowSteps = [
    {
      step: "01",
      title: "Order Release",
      desc: "Instant ERP verification against live warehouse buffer.",
    },
    {
      step: "02",
      title: "CoA Verification",
      desc: "Batch MFI and density validation before seal release.",
    },
    {
      step: "03",
      title: "Palletizing & Seal",
      desc: "Anti-slip shrink-wrapped 25kg bags or bulk tankers.",
    },
    {
      step: "04",
      title: "Telemetry Transit",
      desc: "Live GPS route tracking with automated arrival alerts.",
    },
  ];

  return (
    <section id="supply-chain" className="section supply-section">
      <div className="container">
        <div className="section-head">
          <div className="section-badge">
            <Truck size={14} aria-hidden="true" />
            <span>Logistics & Distribution</span>
          </div>
          <h2 className="section-title">Agile Multi-Modal Distribution</h2>
          <p className="section-subtitle">
            Zero raw material bottlenecks with reserved buffers and live GPS transit tracking.
          </p>
        </div>

        {/* 4-Step Fulfillment Flow */}
        <div className="supply-flow">
          <div className="supply-flow__title">
            <Package size={16} aria-hidden="true" />
            <span>Guaranteed Dispatch Workflow</span>
          </div>
          <div className="supply-flow__grid">
            {workflowSteps.map((ws, i) => (
              <div key={ws.step} className="flow-step">
                <div className="flow-step__top">
                  <span className="flow-step__num">{ws.step}</span>
                  {i < workflowSteps.length - 1 && <span className="flow-step__line" aria-hidden="true" />}
                </div>
                <h4 className="flow-step__title">{ws.title}</h4>
                <p className="flow-step__desc">{ws.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="supply-grid">
          {SUPPLY_CHAIN_CAPABILITIES.map((cap, idx) => {
            const IconComp = iconList[idx % iconList.length];
            return (
              <div key={cap.title} className="supply-card">
                <div className="supply-card__icon-box" aria-hidden="true">
                  <IconComp size={22} />
                </div>
                <div className="supply-card__content">
                  <h3 className="supply-card__title">{cap.title}</h3>
                  <p className="supply-card__desc">{cap.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logistics Assurance Callout */}
        <div className="supply-callout">
          <div className="supply-callout__left">
            <h4>Need scheduled JIT delivery contracts?</h4>
            <p>
              We provide monthly rolling allocations and consignment buffer management for volume converters.
            </p>
          </div>
          <div className="supply-callout__right">
            <div className="supply-callout__perk">
              <CheckCircle2 size={16} className="text-teal" />
              <span>Dedicated Account Manager</span>
            </div>
            <div className="supply-callout__perk">
              <CheckCircle2 size={16} className="text-teal" />
              <span>48-Hour Emergency Buffer Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
