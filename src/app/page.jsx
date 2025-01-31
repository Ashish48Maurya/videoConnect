"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Video, Users, Shield, MessageSquare, MonitorSmartphone } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"

export default function Page() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }))
  }, [controls])

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <section className="relative overflow-hidden bg-white text-black">
          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={controls} custom={0}>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block">Connect with anyone,</span>
                <span className="block text-orange-500">anywhere in the world</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Experience crystal-clear video calls, seamless screen sharing, and instant messaging with our
                cutting-edge platform. Stay connected like never before.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <motion.div className="rounded-md shadow" initial={{ opacity: 0, y: 20 }} animate={controls} custom={1}>
                  <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 md:py-4 md:text-lg md:px-10">
                   <Link href={"/meeting"}>  Get started </Link>
                  </Button>
                </motion.div>
                <motion.div
                  className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  custom={2}
                >
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-2 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="lg:text-center" initial={{ opacity: 0, y: 20 }} animate={controls} custom={3}>
              <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Features</h2>
              <p className="text-3xl leading-8 font-extrabold tracking-tight text-black sm:text-4xl">
                A better way to connect
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
                Our platform offers cutting-edge features to make your video calling experience seamless and enjoyable.
              </p>
            </motion.div>

            <div className="mt-10 lg:mt-16">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {[
                  
                  {
                    icon: Users,
                    title: "Group Calls",
                    description: "Connect with multiple people at once for team meetings or family gatherings.",
                  },
                  
                  {
                    icon: MessageSquare,
                    title: "In-App Chat",
                    description: "Communicate effortlessly with built-in chat functionality during your video calls.",
                  },
                  {
                    icon: MonitorSmartphone,
                    title: "Screen Sharing",
                    description: "Share your screen with ease for presentations, collaboration, or troubleshooting.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="relative p-5 rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    custom={index + 4}
                  >
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-black">{feature.title}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-600">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
