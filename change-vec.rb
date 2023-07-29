#!/usr/bin/ruby

def getIdentifier(line)
    matched = line.match(/"identifier": "(.*)"/)
    return nil if matched.nil?
    return matched.captures[0]
end

def getName(line)
    matched = line.match(/"name": "(.*)"/)
    return nil if matched.nil?
    return matched.captures[0]
end

def getVector(line)
    matched = line.match(/"featureVector": \[(.*)\]/)
    return nil if matched.nil?
    return matched.captures[0].split(", ").map { |val| val.to_f }.map { |val| val == val.to_i ? val.to_i : val }.map { |val| val == 0 ? "" : val }
end

def import(path, to:)
    content = File.read(path)

    # De-prettify
    content = content.gsub(/(?<=\[)[\s\n]+(?=\d)/, '')
    content = content.gsub(/(?<=\d)[\s\n]+(?=\])/, '')

    result = ""
    for line in content.lines do
        identifier = getIdentifier(line) || identifier
        name = getName(line) || name
        vector = getVector(line)
        result += "#{identifier},#{name},#{vector.join(",")}\n" unless vector.nil?
    end

    File.write(to, result)
end

def export(tmpPath, to:)
    result = File.read(tmpPath)

    rebasing = false
    loop do
        dirty = false
        identifier = ""

        content = File.read(to)

        # De-prettify
        content = content.gsub(/(?<=\[)[\s\n]+(?=\d)/, '')
        content = content.gsub(/(?<=\d)[\s\n]+(?=\])/, '')

        lines = content.lines.map { |line|
            next line if dirty

            identifier = getIdentifier(line) || identifier

            next line unless line =~ /featureVector/

            vector = result.lines.find { |line| line.include?(identifier) }.strip.split(",").drop(2) # Drop identifier & name
            vector = vector.map { |val| "#{val.to_f}" }
            vector = vector.map { |val| val.sub(/\.0*$/, "") }
            line2 = line.sub(/(?<="featureVector": \[).*(?=\])/, vector.join(", "))
            next line if line == line2

            dirty = true
            next line2
        }

        break unless dirty

        content = lines.join()
        File.write(to, content)
        system("git add #{to} && git commit --fixup=:/#{identifier.sub(/-[a-zA-Z]+$/, '')}")
        rebasing = true
    end

    system("git rebase -i :/init") if rebasing
end

def run(category)
    tmpPath = "./#{category}.csv"
    path = "./src/models/#{category}/index.json"

    if File.exist?(tmpPath) then
        export(tmpPath, to: path)
        system("rm -i #{tmpPath}")
    else
        import(path, to: tmpPath)
    end
end

run("creatures")
run("items")
