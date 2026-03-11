import { motion } from 'framer-motion'

type BratislavaSkylineProps = {
  compact?: boolean
}

export function BratislavaSkyline({ compact = false }: BratislavaSkylineProps) {
  return (
    <div className={`skyline ${compact ? 'skyline--compact' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="skyline-river" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(122, 210, 195, 0.15)" />
            <stop offset="48%" stopColor="rgba(244, 184, 92, 0.42)" />
            <stop offset="100%" stopColor="rgba(142, 189, 255, 0.18)" />
          </linearGradient>
          <linearGradient id="skyline-glow" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#f4b85c" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7ad2c3" stopOpacity="0.24" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0 268h1200"
          stroke="url(#skyline-river)"
          strokeWidth="5"
          initial={{ pathLength: 0.2, opacity: 0.35 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.g
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M32 268h116v-44l32-18 30 18v44h90v-72h26v-48l34-22 34 22v48h20v72h74v-54l38-24 38 24v54h92v-40l26-22 26 22v40h84"
            fill="rgba(248,244,234,0.08)"
          />
          <path
            d="M788 268h78v-86h24v-26l22-18 22 18v26h14v86h118v-56h20l36-74 36 74h20v56h110"
            fill="rgba(248,244,234,0.08)"
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.05, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <path
            d="M118 268v-94h44v-38h34v38h18v94"
            fill="rgba(248,244,234,0.12)"
            stroke="rgba(248,244,234,0.18)"
          />
          <path
            d="M168 174V124l26-30 26 30v50"
            fill="none"
            stroke="url(#skyline-glow)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M428 268v-120h84v120"
            fill="rgba(248,244,234,0.1)"
            stroke="rgba(248,244,234,0.18)"
          />
          <path
            d="M448 148V96h44v52"
            fill="none"
            stroke="url(#skyline-glow)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M894 268h170"
            stroke="rgba(248,244,234,0.24)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M952 268l42-112 42 112"
            fill="none"
            stroke="url(#skyline-glow)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M988 134c0-26 21-47 47-47s47 21 47 47-21 47-47 47-47-21-47-47Z"
            fill="rgba(248,244,234,0.08)"
            stroke="rgba(248,244,234,0.18)"
          />
          <path
            d="M1035 104v60M1006 134h58"
            stroke="url(#skyline-glow)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  )
}
